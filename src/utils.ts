

export function profit(sellAmount: number, foundingAmount: number): number {
  const profitAmount = sellAmount - foundingAmount;
  const profitProportion = profitAmount / foundingAmount;
  return profitProportion * 100;
}

export function raisedRate(raised: number, fundingAmount: number): number {
  const raisedProportion = raised / fundingAmount;
  return raisedProportion * 100;
}