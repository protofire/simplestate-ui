import * as ethers from 'ethers';

export const address = import.meta.env.VITE_CONTRACT_ADDRESS;
export const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "state",
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
				"internalType": "address",
				"name": "incomeDepositor",
				"type": "address"
			}
		],
		"name": "create",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "maxSupply",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentSupply",
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
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "incomeDepositor",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct Projects.Project",
				"name": "project",
				"type": "tuple"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
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
				"internalType": "string",
				"name": "state",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "maxSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentSupply",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "incomeDepositor",
				"type": "address"
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
				"name": "length",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];