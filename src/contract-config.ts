import * as ethers from 'ethers';

export const address = import.meta.env.VITE_CONTRACT_ADDRESS;
export const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "incomeDepositor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "metadataURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "maxSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "foundingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "foundingTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "produceIncome",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "allowPartialSell",
				"type": "bool"
			}
		],
		"name": "create",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "incomeDepositor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "metadataURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "maxSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "foundingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "foundingTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "produceIncome",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "allowPartialSell",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "state",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "size",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];