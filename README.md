# Simplestate UI

Real estate tokenization UI.

### Running this project

Install dependencies.

```sh
yarn install
```

> You must also create an Alchemy account and configure a new project for the Eth Goerli testing Netwrork.

Create an `.env` file at the root folder of the project and set the following.

```sh
VITE_CONTRACT_ADDRESS='0x...' # the contract you want to interact with.
VITE_ALCHEMY_API_KEY='...'    # the API key for your Alchemy account.
```

Run in local mode

```sh
yarn dev
```