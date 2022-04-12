import { task } from "hardhat/config";

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

