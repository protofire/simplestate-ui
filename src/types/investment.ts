import { IProjectMetadata } from "./projectMetadata";
import { IProjectToken } from "./token";

export interface Investment {
  project: IProjectMetadata;
  token: IProjectToken;
  balance: number;
}