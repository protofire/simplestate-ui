import { useCallback, useEffect, useState } from "react";
import { useContract } from "./useContract";
import { IProjectMetadata, IProjectToken } from "../types/projectMetadata";
import { useMetamask } from "./useMetamask";
import { ContractTransaction, Event } from "ethers";
import { State } from "../constants/projectState";

export function useApi() {
  const registry = useContract('registry');
  const factory = useContract('factory');
  const underlyingToken = useContract('underlyingToken');

  const { signer, connect } = useMetamask();
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

  const fetchToken = async (address: string) => {
    const token = registry.initContract(address, 'ipToken');
    const [[symbol], [name]] = await Promise.all([
      token.functions.symbol(),
      token.functions.name()
    ]);
    return { symbol, name };
  }

  const fetchProjects = useCallback(async (): Promise<IProjectMetadata[]> => {
    if (!registry.contract) return [];

    const { initContract, contract } = registry;
    const functions = contract.functions;

    const projectList: IProjectMetadata[] = [];
    const size = await functions.getNumberOfProjects();
    for (let i = size - 1; i >= 0; i--) {
      const [projectAddress] = await functions.keys(i);
      const projectContract = initContract(projectAddress, 'project');
      const [metadata, [state], targets, financialTracking, tokens, booleanConfigs] = await Promise.all([
        projectContract?.functions.metadata(),
        projectContract?.functions.state(),
        projectContract?.functions.targets(),
        projectContract?.functions.financialTracking(),
        projectContract?.functions.tokens(),
        projectContract?.functions.booleanConfigs()
      ]);

      const hasToken = (state !== State.Created && state !== State.ReadyForApproove);
      const token: IProjectToken | undefined = hasToken ? await fetchToken(tokens.ipToken) : undefined;

      const projectMetadata: IProjectMetadata = {
        ...metadata,
        address: projectAddress,
        state,
        targets,
        financialTracking,
        token,
        booleanConfigs
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
      fundingAmount,
      fundingTime,
      sellAmount,
      sellTime,
      metadataURL,
      produceIncome
    );
    const recipt = await tx.wait();
    return recipt.events;
  }, [factory.contract, signer]);

  const investInProject = useCallback(async (ipAddress: string, amount: number) => {
    if (!signer) return;
    const signedContract = await underlyingToken.sign(signer);
    const approveTx: ContractTransaction = await signedContract?.functions.approve(ipAddress, amount);
    const recipt = await approveTx.wait();

    const ipContract = underlyingToken.initContract(ipAddress, 'project', signer);
    const investTx: ContractTransaction = await ipContract?.functions.invest(amount);
    const reciptInvest = await investTx.wait();
  }, [underlyingToken.contract, signer]);


  return { fetchProjects, createProject, factoryReady, registryReady, investInProject }
}