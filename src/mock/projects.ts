import { IProject } from "../types/project";

export const mockProjects: IProject[] = [
  {
    allowPartialSell: false,
    financtialMetadata: {
      foundingAmount: 10000,
      foundingTime: 90,
      raised: 6000,
      sellAmount: 12000,
      sellTime: 12
    },
    feeModel: 'listing',
    incomeDepositor: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    maxSupply: 5000,
    metadataURL: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80',
    name: 'Rosario - Puerto Norte',
    owner: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    permissioningModel: 'blacklist',
    produceIncome: false,
    state: 'initialized',
    unitOfAccount: 'USDC',
    valuationModel: 'rate',
    id: 1
  },
  {
    allowPartialSell: false,
    financtialMetadata: {
      foundingAmount: 10000,
      foundingTime: 90,
      raised: 10000,
      sellAmount: 12000,
      sellTime: 12
    },
    feeModel: 'listing',
    incomeDepositor: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    maxSupply: 5000,
    metadataURL: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80',
    name: 'Rosario - Puerto Sur',
    owner: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    permissioningModel: 'blacklist',
    produceIncome: false,
    state: 'funded',
    unitOfAccount: 'USDC',
    valuationModel: 'rate',
    id: 22
  },
  {
    allowPartialSell: false,
    financtialMetadata: {
      foundingAmount: 10000,
      foundingTime: 90,
      raised: 10000,
      sellAmount: 12000,
      sellTime: 12
    },
    feeModel: 'listing',
    incomeDepositor: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    maxSupply: 5000,
    metadataURL: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80',
    name: 'Puerto Amarras',
    owner: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    permissioningModel: 'blacklist',
    produceIncome: false,
    state: 'finished',
    unitOfAccount: 'USDC',
    valuationModel: 'rate',
    id: 16
  },
  {
    allowPartialSell: false,
    financtialMetadata: {
      foundingAmount: 10000,
      foundingTime: 90,
      raised: 10000,
      sellAmount: 12000,
      sellTime: 12
    },
    feeModel: 'listing',
    incomeDepositor: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    maxSupply: 5000,
    metadataURL: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2836&q=80',
    name: 'Torres del Este',
    owner: '0x566bF04539C9Bf5eF1fa99d83e29453AD87bcA45',
    permissioningModel: 'blacklist',
    produceIncome: false,
    state: 'finished',
    unitOfAccount: 'USDC',
    valuationModel: 'rate',
    id: 14
  }
];