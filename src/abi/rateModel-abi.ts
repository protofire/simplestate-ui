export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_investmentProject",
				"type": "address"
			}
		],
		"name": "getRate",
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
				"name": "_investmentProject",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_convertionRate",
				"type": "uint256"
			}
		],
		"name": "setRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]