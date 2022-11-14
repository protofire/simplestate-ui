import { useEffect, useState } from "react";
import {address, abi, provider} from '../contract-config';
import * as ethers from 'ethers';

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    const contract = new ethers.Contract(address, abi, provider);
    contract.deployed().then((c) => {
      console.log('contract deployed', c.address);
      setContract(c);
    });
  }, []);

  return { contract }
}