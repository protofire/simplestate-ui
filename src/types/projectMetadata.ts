import { State } from "../constants/projectState";

interface IProjectTargets {
  fundingAmountTarget: number;
  fundingTimeTarget: number;
  sellingAmountTarget: number;
  sellingTimeTarget: number;
}

interface IFinanctialTracking {
  fundingRaised: number;
  redeemableAmount: number;
  cumulativeRedeemableAmount: number;
  accruedFees: number;
  fundingWithdrawed: number;
}

interface IProjectToken {
  symbol: string;
  name: string;
}

export interface IProjectMetadata {
  address: string;
  name: string;
  offchainLink: string;
  state: State;
  targets: IProjectTargets;
  financialTracking: IFinanctialTracking;
  token?: IProjectToken;
  lastUpdate: number;
  numberOfUpdates: number;
  avgTimeBetweenUpdates: number;
  permissioningModel: "Whitelist";
  unitOfAccount: "USDC";
  feeModel: "listing";
  valuationModel: "rate";
}