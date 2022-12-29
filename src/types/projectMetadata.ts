import { State } from "../constants/projectState";
import { IProjectToken } from "./token";

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

export interface IBooleanConfigs {
  produceIncome: boolean;
  allowPartialSell: boolean;
  allowWithdrawalOnPartialFunding: boolean;
}

export interface IProjectMetadata {
  address: string;
  name: string;
  offchainLink: string;
  state: State;
  targets: IProjectTargets;
  financialTracking: IFinanctialTracking;
  token?: IProjectToken;
  booleanConfigs: IBooleanConfigs;
  lastUpdate: number;
  numberOfUpdates: number;
  avgTimeBetweenUpdates: number;
  permissioningModel: "Whitelist";
  unitOfAccount: "USDC";
  feeModel: "listing";
  valuationModel: "rate";
}