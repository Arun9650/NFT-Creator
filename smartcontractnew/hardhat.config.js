require("@nomicfoundation/hardhat-toolbox");


require("dotenv").config({ path: ".env" });

const INFURA_API_KEY_URL = process.env.INFURA_API_KEY_URL;

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: INFURA_API_KEY_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
    },
  },
};