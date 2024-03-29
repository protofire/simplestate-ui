import { useCallback, useEffect, useState } from "react";
import { useContract } from "./useContract";
import { IProjectMetadata } from "../types/projectMetadata";
import { useMetamask } from "./useMetamask";
import { ContractTransaction, Event } from "ethers";
import { State } from "../constants/projectState";
import { Investment } from "../types/investment";
import { IProjectToken } from "../types/token";
import { IFinanctialTracking, IProjectTargets } from "../types/projectMetadata";
import { rateToAPY, fromDecimals, fromRAYDecimals, toDecimals, toRAYDecimals, apyToRate } from "../utils/utilities";
import { SimpleEarnInvestment } from "../types/simple-earn";
import { SimpleEarnMetrics } from "../types/simple-earn-metrics";
import * as Utils from '../utils/utilities';

export function useApi() {
  const registry = useContract('registry');
  const factory = useContract('factory');
  const underlyingToken = useContract('underlyingToken');
  const rent = useContract('rent');
  const simplearn = useContract('simplearn');

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
    try {
      const [[symbol], [name], [supply]] = await Promise.all([
        token.functions.symbol(),
        token.functions.name(),
        token.functions.totalSupply()
      ]);
      return { symbol, name, address, supply: fromDecimals(supply) };
    } catch (e) {
      console.error(`Could not fetch token under address: ${address}`);
      return {
        symbol: '<No Token>',
        name: '<Invalid token>',
        supply: 0,
        address
      }
    }
  }

  const fetchTokenBalance = async (token: string, account: string) => {
    const contract = registry.initContract(token, 'ipToken');
    const [balance] = await contract.functions.balanceOf(account);
    return balance;
  }

  const computeProfitPercent = (
    targets: IProjectTargets,
    rent?: number) => {
    const durationSeconds = targets.sellingTimeTarget - targets.fundingTimeTarget;
    const durationMonths = ((((durationSeconds / 60) / 60) / 24) / 30);
    const totalRent = rent ? durationMonths * rent : 0;
    const sellingAmount = Number(targets.sellingAmountTarget) + totalRent;
    const profitPercent = Utils.profit(
      sellingAmount,
      Number(targets.fundingAmountTarget)
    );
    return profitPercent;
  }

  const getTotalProjects = useCallback(async (): Promise<number> => {
    if (!registry.contract) return 0;
    const size = await registry.contract.functions.getNumberOfProjects();
    return Number(size);
  }, [registry.contract]);

  const fetchProjects = useCallback(async (
    total: number,
    page: number,
    itemsPerPage = 3): Promise<IProjectMetadata[]> => {
    if (!registry.contract || !rent.contract) return [];

    const { initContract, contract } = registry;
    const functions = contract.functions;

    const projectList: IProjectMetadata[] = [];

    let from = (page * itemsPerPage) - 1;
    let to = from - itemsPerPage + 1;
    
    if (from < 0) return [];
    if (to < 0) to = 0;
    if (from >= total) from = total - 1; // prevents overflow

    for (let i = from; i >= to; i--) {
      const [address] = await functions.keys(i);
      const projectContract = initContract(address, 'project');

      const initialPromises = [
        projectContract.functions.metadata(),
        projectContract.functions.state(),
        projectContract.functions.targets(),
        projectContract.functions.financialTracking(),
        projectContract.functions.tokens(),
        projectContract.functions.booleanConfigs(),
        projectContract.functions.modules(),
        projectContract.functions.roles(),
      ];
      
      const [
        metadata, 
        [state], 
        targets, 
        financialTracking, 
        tokens, 
        booleanConfigs, 
        modules, 
        roles
      ] = await Promise.all(initialPromises);

      const hasToken = (state !== State.Created && state !== State.ReadyForApproove);
      const underlyingToken = await fetchToken(tokens.unitOfAccountToken);
      const token = hasToken ? await fetchToken(tokens.ipToken) : undefined;
      const rentIncome = booleanConfigs.produceIncome ? await rent.contract.functions.projectsIcomeDistribution(address) : undefined;

      const targetsParsed: IProjectTargets = {
        fundingAmountTarget: fromDecimals(Number(targets.fundingAmountTarget)),
        fundingTimeTarget: Number(targets.fundingTimeTarget),
        sellingAmountTarget: fromDecimals(Number(targets.sellingAmountTarget)),
        sellingTimeTarget: Number(targets.sellingTimeTarget),
      }
      const financtualTrackingParsed: IFinanctialTracking = {
        accruedFees: fromDecimals(financialTracking.accruedFees),
        cumulativeRedeemableAmount: fromDecimals(financialTracking.cumulativeRedeemableAmount),
        fundingRaised: fromDecimals(financialTracking.fundingRaised),
        fundingWithdrawed: fromDecimals(financialTracking.fundingWithdrawed),
        redeemableAmount: fromDecimals(financialTracking.redeemableAmount),
      }

      const rentAmount = rentIncome ? fromDecimals(Number(rentIncome.estimatedRent)) : undefined;
      const profitPercent = computeProfitPercent(targetsParsed, rentAmount);

      const projectMetadata: IProjectMetadata = {
        ...metadata,
        address,
        state,
        targets: targetsParsed,
        financialTracking: financtualTrackingParsed,
        token,
        booleanConfigs,
        modules,
        roles,
        underlyingToken,
        estimatedRent: booleanConfigs.produceIncome ? rentAmount : undefined,
        profitPercent 
      };
      if (metadata.name !== 'Test') {
        projectList.push(projectMetadata);
      }
    }
    return projectList;
  }, [registry.contract, rent.contract]);

  const createProject = useCallback(async (
    name: string,
    fundingAmount: number,
    fundingTime: number,
    sellAmount: number, 
    sellTime: number,
    metadataURL: string,
    produceIncome: boolean,
    allowPartialSell: boolean,
    rentAmount: number
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
      allowPartialSell,
      toDecimals(rentAmount)
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
    const totalProjects = await getTotalProjects();
    const projects = await fetchProjects(totalProjects, 1, totalProjects);
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

  const getSimpleEarnInvestment = useCallback(async (): Promise<SimpleEarnInvestment & SimpleEarnMetrics | undefined> => {
    if (!simplearn.contract || !underlyingToken.contract) return;

    const address = accounts[0];

    const [
      symbol,
      [balance],
      [underlyingBalance],
      [rate, positive],
      [totalWithdrawable],
      [totalAssets],
      [tokenRate],
      [withdrawalLimitTime, withdrawalLimitAmount],
      underlyingSymbol] = await Promise.all([
      simplearn.contract.functions.symbol(),
      simplearn.contract.functions.balanceOf(address),
      simplearn.contract.functions.balanceOfInAsset(address),
      simplearn.contract.functions.getInterestRate(),
      simplearn.contract.functions.totalWithdrawableAssets(),
      simplearn.contract.functions.totalAssets(),
      simplearn.contract.functions.convertToAssets(toDecimals(1)),
      simplearn.contract.functions.currentWithdrawalLimit(),
      underlyingToken.contract.functions.symbol()
    ]);

    const parsedRate = fromRAYDecimals(rate);
    const apy = rateToAPY(parsedRate, positive);

    return {
      symbol,
      apy,
      balance: fromDecimals(Number(balance)) ?? 0,
      underlyingBalance: fromDecimals(Number(underlyingBalance)) ?? 0,
      totalWithdrawable: fromDecimals(Number(totalWithdrawable)),
      tokenRate: fromDecimals(Number(tokenRate)),
      totalAssets: fromDecimals(Number(totalAssets)),
      underlyingSymbol,
      withdrawalLimitTime: Number(withdrawalLimitTime) / 3600, // from sec to hours
      withdrawalLimitAmount: fromDecimals(Number(withdrawalLimitAmount))
    }

  }, [accounts[0], simplearn.contract, underlyingToken.contract]);

  const setSimplearnRate = useCallback(async (apy: number) => {
    if (!signer || !simplearn.contract) return;
    const rate = apyToRate(apy);
    const isPositive = apy >= 0;
    const rateRay = toRAYDecimals(rate);

    const signedContract = simplearn.sign(signer);
    const tx: ContractTransaction = await signedContract?.functions.setInterestRate(
      rateRay+'', 
      isPositive, 
      { gasLimit: 400000 });
    await tx.wait();
  }, [signer, simplearn.contract]);

  const investSimpleEarn = useCallback(async (amount: number) => {
    if (!signer || !simplearn.contract || !underlyingToken.contract) return;
    const parsedAmount = toDecimals(amount);
    const address = await signer.getAddress();

    const signedUnderlyingTokenContract = underlyingToken.sign(signer);
    const approveTx: ContractTransaction = await signedUnderlyingTokenContract?.functions.approve(
      simplearn.contract?.address, 
      parsedAmount, 
      { gasLimit: 400000 });
    await approveTx.wait();

    const signedSimplearnContract = simplearn.sign(signer);
    const tx: ContractTransaction = await signedSimplearnContract?.functions.deposit(
      parsedAmount, 
      address,
      { gasLimit: 400000 });
    await tx.wait();
  }, [signer, simplearn.contract, underlyingToken.contract]);

  const withdrawSimpleEarn = useCallback(async (amount: number) => {
    if (!signer || !simplearn.contract || !underlyingToken.contract) return;

    const parsedAmount = toDecimals(amount);
    const address = await signer.getAddress();

    const signedSimplearnContract = simplearn.sign(signer);
    const tx: ContractTransaction = await signedSimplearnContract?.functions.withdraw(
      parsedAmount, 
      address, 
      address, 
      { gasLimit: 400000 });
    await tx.wait();

  }, [signer]);

  const withdrawSimplearnFunds = useCallback(async (amount: number) => {
    if (!signer || !simplearn.contract) return;
    const parsedAmount = toDecimals(amount);

    const signedSimplearnContract = simplearn.sign(signer);
    const tx: ContractTransaction = await signedSimplearnContract?.functions.takeFunds(
      parsedAmount,
      { gasLimit: 400000 });
    await tx.wait();

  }, [signer, simplearn.contract]);


  const setWithdrawalLimit = useCallback(async (amount: number, timeInHours: number) => {
    if (!signer || !simplearn.contract) return;
    const parsedAmount = toDecimals(amount);
    const parsedTime = timeInHours * 3600;
    const signedSimplearnContract = simplearn.sign(signer);

    const tx: ContractTransaction = await signedSimplearnContract?.functions.setWithdrawalLimit(
      parsedTime,
      parsedAmount,
      { gasLimit: 400000 });
    await tx.wait();

  }, [signer, simplearn.contract]);

  const fetchProjectNames = useCallback(async (): Promise<{ address: string, name: string }[]> => {
    if (!registry.contract) return [];

    const total = await getTotalProjects();
    const projects: { address: string, name: string }[] = [];

    for (let i = total - 1; i >= 0; i--) {
      const [address] = await registry.contract.functions.keys(i);
      const projectContract = registry.initContract(address, 'project');

      const metadata = await projectContract.functions.metadata();

      if (metadata.name !== 'Test') {
        projects.push({
          name: metadata.name,
          address
        });
      }
    }
    return projects;
  }, [registry.contract]);

  const fetchProject = useCallback(async (address: string): Promise<IProjectMetadata | undefined> => {
    if (!registry.contract || !rent.contract) return undefined;
    const projectContract = registry.initContract(address, 'project');
    const initialPromises = [
      projectContract.functions.metadata(),
      projectContract.functions.state(),
      projectContract.functions.targets(),
      projectContract.functions.financialTracking(),
      projectContract.functions.tokens(),
      projectContract.functions.booleanConfigs(),
      projectContract.functions.modules(),
      projectContract.functions.roles(),
    ];
    
    const [
      metadata, 
      [state], 
      targets, 
      financialTracking, 
      tokens, 
      booleanConfigs, 
      modules, 
      roles
    ] = await Promise.all(initialPromises);


    const hasToken = (state !== State.Created && state !== State.ReadyForApproove);
    const underlyingToken = await fetchToken(tokens.unitOfAccountToken);
    const token = hasToken ? await fetchToken(tokens.ipToken) : undefined;
    const rentIncome = booleanConfigs.produceIncome ? await rent.contract.functions.projectsIcomeDistribution(address) : undefined;

    const targetsParsed: IProjectTargets = {
      fundingAmountTarget: fromDecimals(Number(targets.fundingAmountTarget)),
      fundingTimeTarget: Number(targets.fundingTimeTarget),
      sellingAmountTarget: fromDecimals(Number(targets.sellingAmountTarget)),
      sellingTimeTarget: Number(targets.sellingTimeTarget),
    }
    const financtualTrackingParsed: IFinanctialTracking = {
      accruedFees: fromDecimals(financialTracking.accruedFees),
      cumulativeRedeemableAmount: fromDecimals(financialTracking.cumulativeRedeemableAmount),
      fundingRaised: fromDecimals(financialTracking.fundingRaised),
      fundingWithdrawed: fromDecimals(financialTracking.fundingWithdrawed),
      redeemableAmount: fromDecimals(financialTracking.redeemableAmount),
    }

    const rentAmount = rentIncome ? fromDecimals(Number(rentIncome.estimatedRent)) : undefined;
    const profitPercent = computeProfitPercent(targetsParsed, rentAmount);

    const projectMetadata: IProjectMetadata = {
      ...metadata,
      address,
      state,
      targets: targetsParsed,
      financialTracking: financtualTrackingParsed,
      token,
      booleanConfigs,
      modules,
      roles,
      underlyingToken,
      estimatedRent: booleanConfigs.produceIncome ? rentAmount : undefined,
      profitPercent 
    };
    return projectMetadata;
  }, [registry.contract, rent.contract]);

  return {
    getTotalProjects,
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
    getSimpleEarnInvestment,
    setSimplearnRate,
    investSimpleEarn,
    withdrawSimpleEarn,
    simplearnAddress: simplearn.contract?.address,
    rentIncomeAddress: rent.contract?.address,
    withdrawSimplearnFunds,
    redeem,
    fetchProjectNames,
    fetchProject,
    setWithdrawalLimit
  }
}