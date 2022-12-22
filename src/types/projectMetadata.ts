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

export interface IProjectMetadata {
  address: string;
  name: string;
  offchainLink: string;
  state: State;
  targets: IProjectTargets;
  financialTracking: IFinanctialTracking;
  lastUpdate: number;
  numberOfUpdates: number;
  avgTimeBetweenUpdates: number;
  permissioningModel: "Whitelist";
  unitOfAccount: "USDC";
  feeModel: "listing";
  valuationModel: "rate";
}