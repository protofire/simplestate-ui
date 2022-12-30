import {
  JsonRpcSigner, 
  Network, 
  Web3Provider 
} from '@ethersproject/providers';
import { useState } from 'react';
import { networks } from '../constants/networks';
import { simpleTokenImgURL } from '../constants/urls';

declare global {
  interface Window {
    ethereum: any;
  }
}

function useMetamask() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [network, setNetwork] = useState<Network | null>(null);

  const setupProvider = () => {
    if (!window.ethereum) throw Error('Could not find Metamask extension');
    if (provider) return provider;

    const newProvider = new Web3Provider(window.ethereum);
    setProvider(newProvider);

    window.ethereum.on('accountsChanged', (acc: string[]) => {
      setAccounts(acc);
    })

    window.ethereum.on('chainChanged', (chainId: number) => {
      setNetwork({ chainId: Number(chainId), name: networks[Number(chainId)] });
    });

    return newProvider
  }

  const connectDefault = async () => {
    const provider = setupProvider();
    const accounts: string[] = await provider.send("eth_accounts", []);
    const network: Network = await provider.getNetwork();
    const signer: JsonRpcSigner = provider.getSigner();
    setNetwork({...network, name: networks[network.chainId]});
    setAccounts(accounts);
    setSigner(signer);
  }
  
  const connect = async () => {
    const provider = setupProvider();
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    const network: Network = await provider.getNetwork();
    const signer: JsonRpcSigner = provider.getSigner();
    setNetwork({...network, name: networks[network.chainId]});
    setAccounts(accounts);
    setSigner(signer);
  }

  const getAccounts = async () => {
    const provider = setupProvider();
    const accounts: string[] = await provider.send("eth_accounts", []);
    setAccounts(accounts);
    return accounts;
  }

  const sitchChainTo = async (chainId: number) => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
    }
  }

  const addToken = async (address: string, symbol: string) => {
    const tokenDecimals = 6;
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals: tokenDecimals,
            image: simpleTokenImgURL,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }


  return { 
    signer,
    accounts,
    network,
    connect,
    connectDefault,
    getAccounts,
    sitchChainTo,
    addToken
  }
}

export { useMetamask }