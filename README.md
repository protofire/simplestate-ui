# Simplestate UI

Real estate tokenization UI.

### Running this project

1. Create an [Achemy](https://dashboard.alchemy.com/) account. Under dashboard select "Create App" for the corresponding network.
   - Polygon Mumbai for testing.
   - Polygon for prod.
---

2. Install dependencies.

```sh
yarn install
```
---

3. Create an `.env` file at the root folder of the project and set the following variables

```sh
VITE_REGISTRY_CONTRACT_ADDRESS='0x...'
VITE_FACTORY_CONTRACT_ADDRESS='0x...'
VITE_UNDERLYING_TOKEN_ADDRESS='0x...' # USDS
VITE_RENT_INCOME_CONTRACT_ADDRESS='0x...'
VITE_SIMPLEARN_CONTRACT_ADDRESS='0x...'
VITE_ALCHEMY_API_KEY='...'    # the API key for your Alchemy app.
```

---

4. Run in local mode 

```sh
yarn dev
```

> Make sure to connect your wallet in the right network (Polygon mumbai or Polygon mainnet).


### Deployment
You can deploy the app to any hosting service, we recommend using [Netlify](https://www.netlify.com/) since it offers CI/CD integration + environment variables support.

1. Create a netlify account.
2. Go to [upload app dashboard](https://app.netlify.com/start).
3. Select Github and link the existing repository to the app using `main` branch.
4. Add environment variables present in `.env`.
5. Trigger deploy.

### Project tooling + structure

We use `vite` as the react framework following the standard structure for React applications. The UI library is `mantine` and for smart contracts interactions we use `ethers.js` library.

The Frontend interacts directly with the smart contracts (without any backend layer).

Under `pages/` folder, each sub-folder represents one tab (see UI) and its corresponding sub-components.
Under `hooks/` folder, we have the scripts corresponding to the metamask connection (`useMetamask`), the contracts setup (`useContract`) and the contracts interaction for performing operations on-chain (`useApi`).
