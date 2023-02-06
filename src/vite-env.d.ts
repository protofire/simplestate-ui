/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_ENDPOINT: string;
  readonly VITE_REGISTRY_CONTRACT_ADDRESS: string;
  readonly VITE_FACTORY_CONTRACT_ADDRESS: string;
  readonly VITE_UNDERLYING_TOKEN_ADDRESS: string;
  readonly VITE_RENT_INCOME_CONTRACT_ADDRESS: string;
  readonly VITE_SIMPLEARN_CONTRACT_ADDRESS: string;
  readonly VITE_CHAIN_ID: string;
}