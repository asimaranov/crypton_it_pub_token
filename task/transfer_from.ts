import { task } from "hardhat/config";

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
