import * as ethers from 'ethers';
import { ContractType } from '../types/contract';
import factoryAbi from '../abi/factory-abi';
import registryAbi from '../abi/registry-abi';

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
	}
}

export function getContractMetadata(contractType: ContractType): IContractMetadata {
	switch(contractType) {
		case 'factory': return contractMetadata.factory;
		case 'registry': return contractMetadata.registry;
		default: {
			throw Error('contract type not found')
		}
	}
}

export const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);