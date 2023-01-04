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
				"name": "_sellingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sellingTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_ipRegistry",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_offchainLink",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_produceIncome",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AmountTooBig",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptyParameter",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoSupply",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PartialSellNotAllowed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RedeemNotAllowed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SellBeforeFund",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TimeMustBeFuture",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferReverted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "WithdrawNotAllowed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "allowPartialSellYesOrNo",
				"type": "bool"
			}
		],
		"name": "AllowPartialSellSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "feeModel",
				"type": "address"
			}
		],
		"name": "FeeModelSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundingAmontTargetSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sharesSupply",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			}
		],
		"name": "FundingTargetReached",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "unixtime",
				"type": "uint256"
			}
		],
		"name": "FundingTimeTargetSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountWithdrawed",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "adminCaller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "remainingFundsForWithdrawals",
				"type": "uint256"
			}
		],
		"name": "FundingWithdrawed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			}
		],
		"name": "IncomeDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "invested",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "feeAmountAccured",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ipTokensMinted",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "InvestmentDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "projectId",
				"type": "address"
			}
		],
		"name": "InvestmentProjectsRegistrySet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "ipToken",
				"type": "address"
			}
		],
		"name": "IpTokenSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "NameSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "offchainMetadataLinkSet",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numberOfUpdates",
				"type": "uint256"
			}
		],
		"name": "OffchainMetadataLinkSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "permissioningModel",
				"type": "address"
			}
		],
		"name": "PermissioningModelSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "produceIncomeYesOrNo",
				"type": "bool"
			}
		],
		"name": "ProduceIncomeSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "rateModel",
				"type": "address"
			}
		],
		"name": "RateModelSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_burnedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundsExtracted",
				"type": "uint256"
			}
		],
		"name": "Redeemtion",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SellingAmountTargetSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			}
		],
		"name": "SellingRevenueDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "unixtime",
				"type": "uint256"
			}
		],
		"name": "SellingTimeTargetSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum InvestmentProjectStorage.States",
				"name": "newState",
				"type": "uint8"
			}
		],
		"name": "StateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "unitOfAccountToken",
				"type": "address"
			}
		],
		"name": "UnitOfAccountTokenSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "APPRAISER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "APPROVER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BUILDING_PROGRESS_TRACKER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SELLING_DEPOSITOR_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approveInvestmentProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "askForApproval",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "booleanConfigs",
		"outputs": [
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
				"internalType": "bool",
				"name": "allowWithdrawalOnPartialFunding",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositSellingRevenue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clearer",
				"type": "address"
			}
		],
		"name": "extractRemainingFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "financialTracking",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fundingRaised",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "redeemableAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cumulativeRedeemableAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "accruedFees",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fundingWithdrawed",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentRedeemableRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjectId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "getProjectParticipation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "getRedeemableAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [],
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
		"name": "metadata",
		"outputs": [
			{
				"internalType": "string",
				"name": "offchainLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastUpdate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "avgTimeBetweenUpdates",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfUpdates",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "modules",
		"outputs": [
			{
				"internalType": "address",
				"name": "rateModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "permissioningModel",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "feeModel",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "redeem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roles",
		"outputs": [
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_yesOrNO",
				"type": "bool"
			}
		],
		"name": "setAllowPartialSell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_yesOrNo",
				"type": "bool"
			}
		],
		"name": "setAllowWithdrawalOnPartialFunding",
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
		"name": "setFeeModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundingTimeTarget",
				"type": "uint256"
			}
		],
		"name": "setFundingTimeTarget",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setName",
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
		"name": "setPermissioningModel",
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
		"name": "setRateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sellingAmountTarget",
				"type": "uint256"
			}
		],
		"name": "setSellingAmountTarget",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sellingTimeTarget",
				"type": "uint256"
			}
		],
		"name": "setSellingTimeTarget",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_unitOfAccountToken",
				"type": "address"
			}
		],
		"name": "setUnitOfAccountToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum InvestmentProjectStorage.States",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "targets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fundingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fundingTimeTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellingAmountTarget",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellingTimeTarget",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "ipToken",
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
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "wthdrawFundingCapital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]