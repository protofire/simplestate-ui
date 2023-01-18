import { State } from "../constants/projectState";
import { IProjectMetadata } from "../types/projectMetadata";

export const mockProjects: IProjectMetadata[] = [
  {
    name: 'Mock 0',
    address: '0xmock',
    avgTimeBetweenUpdates: 10,
    booleanConfigs: {
      allowPartialSell: false,
      allowWithdrawalOnPartialFunding: true,
      produceIncome: true,
    },
    financialTracking: {
      accruedFees: 0,
      cumulativeRedeemableAmount: 10,
      fundingRaised: 1000,
      fundingWithdrawed: 500,
      redeemableAmount: 500
    },
    modules: {
      feeModel: "0xmock",
      permissioningModel: "0xmock",
      rateModel: "0xmock",
    },
    token: {
      address: '0xmock',
      name: 'SimpleToken 0',
      supply: 1000,
      symbol: 'SIP 0'
    },
    targets: {
      fundingAmountTarget: 1000,
      fundingTimeTarget: 1000,
      sellingAmountTarget: 1500,
      sellingTimeTarget: 1500
    },
    state: State.Finalized,
    offchainLink:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80",
    roles: {
      admin: '0xmock',
    },
    valuationModel: 'rate',
    feeModel: 'listing',
    lastUpdate: 100,
    numberOfUpdates: 0,
    permissioningModel: 'Whitelist',
    unitOfAccount: 'USDC',
    underlyingToken: { address: '', symbol: 'USDC'}
  },
  {
    name: 'Mock 1',
    address: '0xmock',
    avgTimeBetweenUpdates: 10,
    booleanConfigs: {
      allowPartialSell: false,
      allowWithdrawalOnPartialFunding: true,
      produceIncome: false,
    },
    financialTracking: {
      accruedFees: 0,
      cumulativeRedeemableAmount: 10,
      fundingRaised: 1000,
      fundingWithdrawed: 500,
      redeemableAmount: 500
    },
    modules: {
      feeModel: "0xmock",
      permissioningModel: "0xmock",
      rateModel: "0xmock",
    },
    token: {
      address: '0xmock',
      name: 'SimpleToken 0',
      supply: 1000,
      symbol: 'SIP 0'
    },
    targets: {
      fundingAmountTarget: 1000,
      fundingTimeTarget: 1000,
      sellingAmountTarget: 1500,
      sellingTimeTarget: 1500
    },
    state: State.Finalized,
    offchainLink:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80",
    roles: {
      admin: '0xmock',
    },
    valuationModel: 'rate',
    feeModel: 'listing',
    lastUpdate: 100,
    numberOfUpdates: 0,
    permissioningModel: 'Whitelist',
    unitOfAccount: 'USDC',
    underlyingToken: { address: '', symbol: 'USDC'}
  },
   {
    name: 'Mock 2',
    address: '0xmock',
    avgTimeBetweenUpdates: 10,
    booleanConfigs: {
      allowPartialSell: false,
      allowWithdrawalOnPartialFunding: true,
      produceIncome: true,
    },
    financialTracking: {
      accruedFees: 0,
      cumulativeRedeemableAmount: 10,
      fundingRaised: 1000,
      fundingWithdrawed: 500,
      redeemableAmount: 500
    },
    modules: {
      feeModel: "0xmock",
      permissioningModel: "0xmock",
      rateModel: "0xmock",
    },
    token: {
      address: '0xmock',
      name: 'SimpleToken 0',
      supply: 1000,
      symbol: 'SIP 0'
    },
    targets: {
      fundingAmountTarget: 1000,
      fundingTimeTarget: 1000,
      sellingAmountTarget: 1500,
      sellingTimeTarget: 1500
    },
    state: State.Finalized,
    offchainLink:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80",
    roles: {
      admin: '0xmock',
    },
    valuationModel: 'rate',
    feeModel: 'listing',
    lastUpdate: 100,
    numberOfUpdates: 0,
    permissioningModel: 'Whitelist',
    unitOfAccount: 'USDC',
    underlyingToken: { address: '', symbol: 'USDC'}
  }
];
