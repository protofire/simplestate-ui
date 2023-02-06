import * as ethers from 'ethers';
import { ContractType } from '../types/contract';
import factoryAbi from '../abi/factory-abi';
import registryAbi from '../abi/registry-abi';
import projectAbi from '../abi/project-abi';
import ipTokenAbi from '../abi/ipToken-abi';
import erc20Abi from '../abi/erc20-abi';
import rateModelAbi from '../abi/rateModel-abi';
import rentAbi from '../abi/rent-abi';
import simplearnAbi from '../abi/simplearn-abi';

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
	},
	underlyingToken: {
		address: import.meta.env.VITE_UNDERLYING_TOKEN_ADDRESS,
		abi: erc20Abi
	},
	rateModel: {
		address: '',
		abi: rateModelAbi
	},
	rent: {
		address: import.meta.env.VITE_RENT_INCOME_CONTRACT_ADDRESS,
		abi: rentAbi
	},
	simplearn: {
		address: import.meta.env.VITE_SIMPLEARN_CONTRACT_ADDRESS,
		abi: simplearnAbi
	},
}

export function getContractMetadata(contractType: ContractType): IContractMetadata {
	return contractMetadata[contractType]
}

export const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ENDPOINT);