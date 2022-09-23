const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {

  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so exchangeContract here is a factory for instances of our Exchange contract.
  */
  const NFTFactory = await ethers.getContractFactory("ERC721Factory");

  // here we deploy the contract
  const deployedNFTFactory = await NFTFactory.deploy();
  await deployedNFTFactory.deployed();

  // print the address of the deployed contract
  console.log("NFTFactory  Address:", deployedNFTFactory.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });