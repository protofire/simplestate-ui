# Simplestate UI

Real estate tokenization UI.

### Running this project

Install dependencies.

```sh
yarn install
```

> You must also create an Alchemy account and configure a new project for the Eth Goerli testing Netwrork.

Create an `.env` file at the root folder of the project and set the following variables

```sh
VITE_REGISTRY_CONTRACT_ADDRESS='0x...'
VITE_FACTORY_CONTRACT_ADDRESS='0x...'
VITE_UNDERLYING_TOKEN_ADDRESS='0x...' # USDC
VITE_RENT_INCOME_CONTRACT_ADDRESS='0x...'
VITE_ALCHEMY_API_KEY='...'    # the API key for your Alchemy account.
```

Run in local mode

```sh
yarn dev
```

### Project tooling + structure

We use `vite` as the react framework following the standard structure for React applications. The UI library is `mantine` and for smart contracts interactions we use `ethers.js` library.

The Frontend interacts directly with the smart contracts (without any backend layer).

Under `pages/` folder, each sub-folder represents one tab (see UI) and its corresponding sub-components.
Under `hooks/` folder, we have the scripts corresponding to the metamask connection (`useMetamask`), the contracts setup (`useContract`) and the contracts interaction for performing operations on-chain (`useApi`).
