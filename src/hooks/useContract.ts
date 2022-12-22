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
    contract.deployed().then((c) => {
      setContract(c);
    });
  }, []);

  const initContract = (address: string, contractType: ContractType) => {
    const { abi } = getContractMetadata(contractType);
    return new ethers.Contract(address, abi, provider);
  }

  const sign = useCallback(async (signer: JsonRpcSigner) => {
    if (contract) {
      const signed = contract.connect(signer);
      return signed;
    }
  }, [contract]);

  return { contract, sign, initContract }
}