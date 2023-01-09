export function profit(sellAmount: number, foundingAmount: number): number {
  const profitAmount = sellAmount - foundingAmount;
  const profitProportion = profitAmount / foundingAmount;
  return profitProportion * 100;
}

export function raisedRate(raised: number, fundingAmount: number): number {
  const raisedProportion = raised / fundingAmount;
  return raisedProportion * 100;
}

export function toDecimals(value: number)  {
  const result = value * Math.pow(10, 6);
  return Math.trunc(result);
};

export function fromDecimals(value: number)  {
  return value / Math.pow(10, 6)
};

export function truncToTwoDecimals(value: number) {
  return value.toFixed(2);
}