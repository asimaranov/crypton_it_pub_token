import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("deploy", "Deploy contract to the ethereum network", async (taskArgs, hre) => {
  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = await ItPubTokenContract.deploy();

  await itPubTokenContract.deployed();

  console.log("Contract deployed to:", itPubTokenContract.address);
});

task("balanceOf", "Get my balance").addParam("contractAddr", "Address of the deployed contract")
.setAction(async (taskArgs, hre) => {
  let [owner] = await hre.ethers.getSigners();
  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  console.log(`Your balance: ${await itPubTokenContract.balanceOf(owner.address)}`);
});

task("totalSupply", "Get the total supply").addParam("contractAddr", "Address of the deployed contract")
.setAction(async (taskArgs, hre) => {
  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  console.log(`Total supply: ${await itPubTokenContract.totalSupply()}`);
});


task("transfer", "Transfer tokens to another account")
.addParam("contractAddr", "Address of the deployed contract")
.addParam("toAddr", "Address of user to transfer")
.addParam("value", "Amount of tokens to transfer")
.setAction(async (taskArgs, hre) => {

  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  let transferTransaction = await itPubTokenContract.transfer(taskArgs['toAddr'], taskArgs['value']);

  let rc = await transferTransaction.wait();
  let transferEvent = rc.events?.find(event => event.event == "Transfer");
  if(!transferEvent?.args){
    return console.log("Something went wrong while transferring")
  }
  const [_from, _to, _value] = transferEvent?.args!;
  console.log(`Successfully transfered ${_value} tokens from ${_from} to ${_to}`);


});

task("approve", "Allows spender to withdraw from your account multiple times, up to the value amount")
.addParam("contractAddr", "Address of the deployed contract")
.addParam("toAddr", "Address of user to transfer")
.addParam("value", "Amount of tokens to transfer")
.setAction(async (taskArgs, hre) => {

  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);


  let approvingTransaction = await itPubTokenContract.approve(taskArgs['toAddr'], taskArgs['value']);

  let rc = await approvingTransaction.wait();
  const approvalEvent = rc.events?.find(event => event.event === 'Approval')!;

  if(!approvalEvent?.args){
    return console.log("Something went wrong while approving")
  }


  const [_owner, _spender, _value] = approvalEvent.args;
  console.log(`Successfully approved ${_value} tokens from ${_owner} to ${_spender}`);

});


task("transferFrom", "Transfer tokens to another account")
.addParam("contractAddr", "Address of the deployed contract")
.addParam("fromAddr", "Address of user to withdraw")
.addParam("toAddr", "Address of user to transfer")
.addParam("value", "Amount of tokens to transfer")
.setAction(async (taskArgs, hre) => {

  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  let transferTransaction = await itPubTokenContract.transferFrom(taskArgs['fromAddr'], taskArgs['toAddr'], taskArgs['value']);

  let rc = await transferTransaction.wait();
  let transferEvent = rc.events?.find(event => event.event == "Transfer");
  if(!transferEvent?.args){
    return console.log("Something went wrong while transferring")
  }
  const [_from, _to, _value] = transferEvent?.args!;
  console.log(`Successfully transfered ${_value} tokens from ${_from} to ${_to}`);


});


task("burn", "Burn tokens from account")
.addParam("contractAddr", "Address of the deployed contract")
.addParam("value", "Amount of tokens to burn")
.setAction(async (taskArgs, hre) => {

  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  let transferTransaction = await itPubTokenContract.burn(taskArgs['value']);

  let rc = await transferTransaction.wait();
  let transferEvent = rc.events?.find(event => event.event == "Transfer");
  if(!transferEvent?.args){
    return console.log("Something went wrong while transferring")
  }
  const [_from, _to, _value] = transferEvent?.args!;
  console.log(`Successfully transfered ${_value} tokens from ${_from} to ${_to}`);


});



const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },

  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        gas: 2100000,
      gasPrice: 8000000000
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  

};

export default config;
