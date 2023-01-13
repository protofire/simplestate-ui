export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ipRegistry",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ipRentIncome",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_feeModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_permissioningModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_rateModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_unitOfAccountToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_investmentProject",
				"type": "address"
			}
		],
		"name": "InvestmentProjectCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "defaultSettings",
		"outputs": [
			{
				"internalType": "address",
				"name": "feeModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "permissioningModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "rateModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "unitOfAccountToken",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_fundingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fundingTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sellAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sellTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_offChainLink",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_produceIncome",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_allowPartialSell",
				"type": "bool"
			}
		],
		"name": "deployProject",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ipRegistry",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ipRentIncome",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feeModel",
				"type": "address"
			}
		],
		"name": "setDefaultFeeModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_permissioningModel",
				"type": "address"
			}
		],
		"name": "setDefaultPermissioningModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_rateModel",
				"type": "address"
			}
		],
		"name": "setDefaultRateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ipRentIncome",
				"type": "address"
			}
		],
		"name": "setRentIncome",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]