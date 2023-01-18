import { State } from "../constants/projectState";
import { IProjectToken, UnderlyingToken } from "./token";

export interface IProjectTargets {
  fundingAmountTarget: number;
  fundingTimeTarget: number;
  sellingAmountTarget: number;
  sellingTimeTarget: number;
}

export interface IFinanctialTracking {
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

export interface IProjectModules {
  rateModel: string;
  permissioningModel: string;
  feeModel: string;
}

export interface IProjectRoles {
  admin: string;
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
  modules: IProjectModules;
  lastUpdate: number;
  numberOfUpdates: number;
  avgTimeBetweenUpdates: number;
  permissioningModel: "Whitelist";
  unitOfAccount: "USDC";
  feeModel: "listing";
  valuationModel: "rate";
  roles: IProjectRoles;
  underlyingToken: UnderlyingToken;
}