
const SECONDS_IN_YEAR = 31536000;

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
  return value / Math.pow(10, 6);
};

export function truncToTwoDecimals(value: number) {
  return value.toFixed(2);
}

export function fromRAYDecimals(value: number) {
  return value / Math.pow(10, 27);
}

export function toRAYDecimals(value: number) {
  const result = value * Math.pow(10, 27);
  return Math.trunc(result);
}

export function apyToRate(apy: number) {
  if (apy > 0) {
    return Math.pow(1 + (apy/100) , 1/SECONDS_IN_YEAR) - 1;
  } else {
    return Math.pow(1 - (apy/100), 1/SECONDS_IN_YEAR) - 1;
  }
}

export function rateToAPY(rate: number, positive: boolean) {
  const apy = ((Math.pow(1 + rate, SECONDS_IN_YEAR)) - 1 ) * 100;
  if (!positive) {
    return apy * -1;
  } 
  return apy;
}