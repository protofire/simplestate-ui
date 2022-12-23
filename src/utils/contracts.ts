import * as ethers from 'ethers';
import { ContractType } from '../types/contract';
import factoryAbi from '../abi/factory-abi';
import registryAbi from '../abi/registry-abi';
import projectAbi from '../abi/project-abi';
import ipTokenAbi from '../abi/ipToken-abi';

interface IContractMetadata {
	address: string;
	abi: any;
}

const contractMetadata: Record<string, IContractMetadata> = {
	factory: {
		address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
		abi: factoryAbi
	},
	registry: {
		address: import.meta.env.VITE_REGISTRY_CONTRACT_ADDRESS,
		abi: registryAbi
	},
	ipToken: {
		address: '',
		abi: ipTokenAbi
	},
	project: {
		address: '',
		abi: projectAbi
	}
}

export function getContractMetadata(contractType: ContractType): IContractMetadata {
	return contractMetadata[contractType]
}

export const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);