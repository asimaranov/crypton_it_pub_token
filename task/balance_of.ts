import { task } from "hardhat/config";

task("balanceOf", "Get my balance").addParam("contractAddr", "Address of the deployed contract")
.setAction(async (taskArgs, hre) => {
  let [owner] = await hre.ethers.getSigners();
  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  console.log(`Your balance: ${await itPubTokenContract.balanceOf(owner.address)}`);
});



