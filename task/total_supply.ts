import { task } from "hardhat/config";

task("totalSupply", "Get the total supply").addParam("contractAddr", "Address of the deployed contract")
.setAction(async (taskArgs, hre) => {
  const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

  console.log(`Total supply: ${await itPubTokenContract.totalSupply()}`);
});

