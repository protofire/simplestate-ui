export interface IProject {
  name: string;
  state: string;
  maxSupply: number;
  foundingAmountTarget: number;
  foundingTimeTarget: number; // Unix timestamp
  sellAmountTarget: number;
  sellTimeTarget: number; // Unix timestamp
  incomeDepositor: string;
}
