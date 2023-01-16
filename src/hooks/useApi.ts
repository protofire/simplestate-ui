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
  const rent = useContract('rent');

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
    produceIncome: boolean,
    allowPartialSell: boolean
  ): Promise<Event[] | undefined> => {
    if (!signer) return;
    const signedContract = factory.sign(signer);
    const tx: ContractTransaction = await signedContract?.functions.deployProject(
      name,
      toDecimals(fundingAmount),
      fundingTime,
      toDecimals(sellAmount),
      sellTime,
      metadataURL,
      produceIncome,
      allowPartialSell
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

    const rentQueries = tokenizedProjects.map(p => p.booleanConfigs.produceIncome ? getClaimableRent(p) : 0);
    const rents = await Promise.all(rentQueries);

    const investments = tokens.map((t, i) : Investment => ({
      project: tokenizedProjects[i],
      token: t,
      balance: fromDecimals(Number(balances[i])),
      claimableRent: fromDecimals(Number(rents[i]))
    }));
    
    return investments.filter((i) => i.balance !== 0);
  }, [fetchProjects, accounts]);

  const withdrawFunds = useCallback(async (project: IProjectMetadata, amount: number) => {
    if (!signer) return;
    const signerAddress = await signer.getAddress();
    if (signerAddress != project.roles.admin) throw { reason: 'Only the admin can withdraw the funds' };

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

  const getClaimableRent = async (project: IProjectMetadata): Promise<number> => {
    if (!accounts[0] || !rent || !project.booleanConfigs.produceIncome) return 0;
    const claimableAmount = await rent.contract?.functions.getCurrentClaimableAmount(project.address, accounts[0]);
    return Number(claimableAmount);
  }

  const depositRentAmount = useCallback(async (ipAddress: string, amount: number) => {
    if (!signer || !rent || !underlyingToken) return;
    const parsedAmount = toDecimals(amount);

    const signedUnderlyingTokenContract = underlyingToken.sign(signer);
    const approveTx: ContractTransaction = await signedUnderlyingTokenContract?.functions.approve(rent.contract?.address, parsedAmount);
    await approveTx.wait();

    const signedContract = rent.sign(signer);
    const depositTx: ContractTransaction = await signedContract?.functions.depositIncomeDistribution(ipAddress, parsedAmount);
    await depositTx.wait();
  }, [rent, signer, underlyingToken]);

  const claimRent = useCallback(async (ipAddress: string) => {
    if (!signer || !rent) return;
    const signerAddress = await signer.getAddress();
    const signedContract = rent.sign(signer);
    const depositTx: ContractTransaction = await signedContract?.functions.claimAll(ipAddress, signerAddress);
    await depositTx.wait();
  }, [rent, signer]);

  const getAccumulatedRent = useCallback(async (ipAddress: string): Promise<number> => {
    if (!signer || !rent) return 0;
    const signedContract = rent.sign(signer);
    const [produceIncome, lastEpoch, totalDeposited, totalClaimed] = await signedContract?.functions.projectsIcomeDistribution(ipAddress);
    return fromDecimals(Number(totalDeposited));
  }, [rent, signer]);

  return {
    fetchProjects,
    createProject,
    factoryReady,
    registryReady,
    investInProject,
    getInvestments,
    withdrawFunds,
    depositSellingAmount,
    depositRentAmount,
    claimRent,
    getAccumulatedRent,
    redeem
  }
}