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
				"internalType": "uint64",
				"name": "maxSupply",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "foundingAmount",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "foundingTime",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "sellAmount",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "sellTime",
				"type": "uint64"
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
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SingleProjectInvestment",
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
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
				"components": [
					{
						"internalType": "uint256",
						"name": "foundingAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "foundingTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "raised",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectsMock.FinanctialMetadata",
				"name": "financtialMetadata",
				"type": "tuple"
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
			},
			{
				"internalType": "string",
				"name": "unitOfAccount",
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