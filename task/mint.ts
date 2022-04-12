import { task } from "hardhat/config";

task("mint", "Mint tokens to the contract owner account")
.addParam("contractAddr", "Address of the deployed contract")
.addParam("value", "Amount of tokens to mint")
.setAction(async (taskArgs, hre) => {

  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  let transferTransaction = await itPubTokenContract.mint(taskArgs['value']);

  let rc = await transferTransaction.wait();
  let transferEvent = rc.events?.find(event => event.event == "Transfer");
  if(!transferEvent?.args){
    return console.log("Something went wrong while transferring")
  }
  const [_from, _to, _value] = transferEvent?.args!;
  console.log(`Successfully transfered ${_value} tokens from ${_from} to ${_to}`);


});

