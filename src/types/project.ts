export type ProjectState = "created" | "initialized" | "funded" | "finished";

interface IFinanctialMetadata {
  foundingAmount: number;
  foundingTime: number;
  sellAmount: number;
  sellTime: number;
  raised: number;
}

export interface IProject {
  id?: number;
  name: string;
  owner: string;
  incomeDepositor: string;
  metadataURL: string;
  permissioningModel: "blacklist";
  maxSupply: number;
  unitOfAccount: "USDC";
  financtialMetadata: IFinanctialMetadata;
  produceIncome: boolean;
  allowPartialSell: boolean;
  feeModel: "listing";
  valuationModel: "rate";
  state: ProjectState;
  redeemableAmount: number;
}
