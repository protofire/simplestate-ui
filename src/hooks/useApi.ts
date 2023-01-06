import { useCallback, useEffect, useState } from "react";
import { useContract } from "./useContract";
import { IProjectMetadata } from "../types/projectMetadata";
import { useMetamask } from "./useMetamask";
import { ContractTransaction, Event } from "ethers";
import { State } from "../constants/projectState";
import { Investment } from "../types/investment";
import { IProjectToken } from "../types/token";
import { IFinanctialTracking, IProjectTargets } from "../types/projectMetadata";
import { fromDecimals, toDecimals } from "../utils/utilities";

export function useApi() {
  const registry = useContract('registry');
  const factory = useContract('factory');
  const underlyingToken = useContract('underlyingToken');

  const { signer, connect, accounts, addToken } = useMetamask();
  const [factoryReady, setFactoryReady] = useState(false);
  const [registryReady, setRegistryReady] = useState(false);

  useEffect(() => {
    connect();
  },[])

  useEffect(() => {
    setFactoryReady(!!factory.contract);
  }, [factory.contract]);

  useEffect(() => {
    setRegistryReady(!!registry.contract);
  }, [registry.contract]);

  const fetchToken = async (address: string): Promise<IProjectToken> => {
    const token = registry.initContract(address, 'ipToken');
    const [[symbol], [name], [supply]] = await Promise.all([
      token.functions.symbol(),
      token.functions.name(),
      token.functions.totalSupply()
    ]);
    return { symbol, name, address, supply: fromDecimals(supply) };
  }

  const fetchTokenBalance = async (token: string, account: string) => {
    const contract = registry.initContract(token, 'ipToken');
    const [balance] = await contract.functions.balanceOf(account);
    return balance;
  }

  const fetchProjectRate = async (projectAddress: string, rateModelAddress: string) => {
    const contract = registry.initContract(rateModelAddress, 'rateModel');
    const [rate] = await contract.functions.getRate(projectAddress);
    return rate;
  }

  const fetchProjects = useCallback(async (): Promise<IProjectMetadata[]> => {
    if (!registry.contract) return [];

    const { initContract, contract } = registry;
    const functions = contract.functions;

    const projectList: IProjectMetadata[] = [];
    const size = await functions.getNumberOfProjects();
    for (let i = size - 1; i >= 0; i--) {
      const [address] = await functions.keys(i);
      const projectContract = initContract(address, 'project');
      const [metadata, [state], targets, financialTracking, tokens, booleanConfigs, modules, roles] = await Promise.all([
        projectContract?.functions.metadata(),
        projectContract?.functions.state(),
        projectContract?.functions.targets(),
        projectContract?.functions.financialTracking(),
        projectContract?.functions.tokens(),
        projectContract?.functions.booleanConfigs(),
        projectContract?.functions.modules(),
        projectContract?.functions.roles()
      ]);

      const hasToken = (state !== State.Created && state !== State.ReadyForApproove);
      const token: IProjectToken | undefined = hasToken ? await fetchToken(tokens.ipToken) : undefined;

      const targetsParsed: IProjectTargets = {
        fundingAmountTarget: fromDecimals(targets.fundingAmountTarget),
        fundingTimeTarget: targets.fundingTimeTarget,
        sellingAmountTarget: fromDecimals(targets.sellingAmountTarget),
        sellingTimeTarget: targets.sellingTimeTarget,
      }
      const financtualTrackingParsed: IFinanctialTracking = {
        accruedFees: fromDecimals(financialTracking.accruedFees),
        cumulativeRedeemableAmount: fromDecimals(financialTracking.cumulativeRedeemableAmount),
        fundingRaised: fromDecimals(financialTracking.fundingRaised),
        fundingWithdrawed: fromDecimals(financialTracking.fundingWithdrawed),
        redeemableAmount: fromDecimals(financialTracking.redeemableAmount),
      }

      const projectMetadata: IProjectMetadata = {
        ...metadata,
        address,
        state,
        targets: targetsParsed,
        financialTracking: financtualTrackingParsed,
        token,
        booleanConfigs,
        modules,
        roles
      };
      projectList.push(projectMetadata);
    }
    return projectList;
  }, [registry.contract]);

  const createProject = useCallback(async (
    name: string,
    fundingAmount: number,
    fundingTime: number,
    sellAmount: number, 
    sellTime: number,
    metadataURL: string,
    produceIncome: boolean
  ): Promise<Event[] | undefined> => {
    if (!signer) return;
    const signedContract = await factory.sign(signer);
    const tx: ContractTransaction = await signedContract?.functions.deployProject(
      name,
      toDecimals(fundingAmount),
      fundingTime,
      toDecimals(sellAmount),
      sellTime,
      metadataURL,
      produceIncome
    );
    const recipt = await tx.wait();
    return recipt.events;
  }, [factory.contract, signer]);

  const investInProject = useCallback(async (ipAddress: string, amount: number, token: IProjectToken) => {
    if (!signer) return;
    const parsedAmount = toDecimals(amount);
    const signedContract = underlyingToken.sign(signer);
    const approveTx: ContractTransaction = await signedContract?.functions.approve(ipAddress, parsedAmount);
    await approveTx.wait();

    const ipContract = underlyingToken.initContract(ipAddress, 'project', signer);
    const investTx: ContractTransaction = await ipContract?.functions.invest(parsedAmount);
    await investTx.wait();

    addToken(token.address, token.symbol)
  }, [underlyingToken.contract, signer]);


  const getInvestments = useCallback(async (): Promise<Investment[] | null> => {
    if (!accounts[0]) return null;
    const projects = await fetchProjects();
    const tokenizedProjects = projects.filter(p => !!p.token);
    const tokens = tokenizedProjects.map(p => p.token!);

    const balanceQueries = tokens.map(t => fetchTokenBalance(t.address, accounts[0]));
    const balances = await Promise.all(balanceQueries);

    const investments = tokens.map((t, i) => ({
      project: tokenizedProjects[i],
      token: t,
      balance: fromDecimals(Number(balances[i])),
    }));
    
    return investments.filter((i) => i.balance !== 0);
  }, [fetchProjects, accounts]);

  const withdrawFunds = useCallback(async (project: IProjectMetadata, amount: number) => {
    if (!signer) return;
    const signerAddress = await signer.getAddress();
    if (signerAddress != project.roles.admin) throw { reason: 'Only the admin can withdraw the funds' };

    console.log('project');
    console.log(project);

    const allowed = project.state === State.Funded || (project.state === State.Initialized && project.booleanConfigs.allowWithdrawalOnPartialFunding);
    if (!allowed) throw { reason: 'Project state not allowed' };

    const parsedAmount = toDecimals(amount);
    const ipContract = underlyingToken.initContract(project.address, 'project', signer);
    const withdrawTx: ContractTransaction = await ipContract?.functions.wthdrawFundingCapital(parsedAmount);
    await withdrawTx.wait();
  }, [signer]);

  const depositSellingAmount = useCallback(async (ipAddress: string, amount: number) => {
    if (!signer) return;
    const parsedAmount = toDecimals(amount);

    const signedContract = underlyingToken.sign(signer);
    const approveTx: ContractTransaction = await signedContract?.functions.approve(ipAddress, parsedAmount);
    await approveTx.wait();

    const ipContract = underlyingToken.initContract(ipAddress, 'project', signer);
    const withdrawTx: ContractTransaction = await ipContract?.functions.depositSellingRevenue(parsedAmount);
    await withdrawTx.wait();
  }, [signer, underlyingToken]);

  const redeem = useCallback(async (amount: number, ipAddress: string, ipTokenAddress: string) => {
    if (!signer || !underlyingToken) return;
    const parsedAmount = toDecimals(amount);

    const contract = underlyingToken.initContract(ipTokenAddress, 'ipToken', signer);
    const allowTx: ContractTransaction = await contract?.functions.increaseAllowance(ipAddress, parsedAmount);
    await allowTx.wait();

    const ipContract = underlyingToken.initContract(ipAddress, 'project', signer);
    const redeemTx: ContractTransaction = await ipContract?.functions.redeem();
    await redeemTx.wait();
  }, [signer, underlyingToken]);

  return {
    fetchProjects,
    createProject,
    factoryReady,
    registryReady,
    investInProject,
    getInvestments,
    withdrawFunds,
    depositSellingAmount,
    redeem
  }
}