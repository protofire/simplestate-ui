export default [
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
			}
		],
		"name": "deployProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ipRegistry",
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
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
	}
]