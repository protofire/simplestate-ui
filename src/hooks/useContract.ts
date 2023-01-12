import { useCallback, useEffect, useState } from "react";
import { provider, getContractMetadata } from '../utils/contracts';
import { JsonRpcSigner } from "@ethersproject/providers";
import * as ethers from 'ethers';
import { ContractType } from "../types/contract";

export function useContract(contractType: ContractType) {
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    const { address, abi } = getContractMetadata(contractType);
    const contract = new ethers.Contract(address, abi, provider);
    setContract(contract);
  }, []);

  const initContract = (address: string, contractType: ContractType, signer?: JsonRpcSigner) => {
    const { abi } = getContractMetadata(contractType);
    const initializedContract = new ethers.Contract(address, abi, provider);

    if (signer) return initializedContract.connect(signer);
    return initializedContract;
  }

  const sign = useCallback((signer: JsonRpcSigner) => {
    if (contract) {
      const signed = contract.connect(signer);
      return signed;
    }
  }, [contract]);

  return { contract, sign, initContract }
}