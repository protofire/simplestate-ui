/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_API_KEY: string;
  readonly VITE_REGISTRY_CONTRACT_ADDRESS: string;
  readonly VITE_FACTORY_CONTRACT_ADDRESS: string;
  readonly VITE_UNDERLYING_TOKEN_ADDRESS: string;
  readonly VITE_RENT_INCOME_CONTRACT_ADDRESS: string;
  readonly VITE_SIMPLEARN_CONTRACT_ADDRESS: string;
}