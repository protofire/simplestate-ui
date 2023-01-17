import { Investment } from "../types/investment";
import { mockProjects } from "./projects";


export const mockInvestments: Investment[] = [
  {
    balance: 10,
    project: mockProjects[0],
    token: mockProjects[0].token!,
    claimableRent: 10
  },
  {
    balance: 10,
    project: mockProjects[1],
    token: mockProjects[1].token!,
  },
  {
    balance: 10,
    project: mockProjects[2],
    token: mockProjects[2].token!,
  },
];
