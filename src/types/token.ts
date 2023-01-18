export interface IProjectToken {
  address: string;
  symbol: string;
  name: string;
  supply: number;
}

export type UnderlyingToken = Pick<IProjectToken, 'address' | 'symbol'>
