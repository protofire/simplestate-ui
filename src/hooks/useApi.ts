import { useCallback, useEffect, useState } from "react";
import { useContract } from "./useContract";
import { IProjectMetadata } from "../types/projectMetadata";

export function useApi() {
  const registry = useContract('registry');
  const factory = useContract('factory');

  const [factoryReady, setFactoryReady] = useState(false);
  const [registryReady, setRegistryReady] = useState(false);

  useEffect(() => {
    setFactoryReady(!!factory.contract);
  }, [factory.contract]);

  useEffect(() => {
    setRegistryReady(!!registry.contract);
  }, [registry.contract]);

  const fetchProjects = useCallback(async (): Promise<IProjectMetadata[]> => {
    if (!registry.contract) return [];

    const { initContract, contract } = registry;
    const functions = contract.functions;

    const projectList: IProjectMetadata[] = [];
    const size = await functions.getNumberOfProjects();
    for (let i = size - 1; i >= 0; i--) {
      const [projectAddress] = await functions.keys(i);
      const projectContract = initContract(projectAddress, 'project');
      const projectMetadata: IProjectMetadata = await projectContract?.functions.metadata();
      projectList.push(projectMetadata);
    }
    return projectList;
  }, [registry.contract]); 


  return { fetchProjects, factoryReady, registryReady }
}