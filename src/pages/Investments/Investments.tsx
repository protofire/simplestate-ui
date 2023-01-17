
import { SimpleEarn } from "./SimpleEarnInvestment/SimpleEarn";
import { SimpleProjectInvestment } from "./SimpleProjectInvestment/SimpleProjectInvestment";

export function Investments() {
  return (
    <>
      <SimpleEarn />
      <SimpleProjectInvestment />
    </>
  );
}