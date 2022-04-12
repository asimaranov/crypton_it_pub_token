import { ethers } from "hardhat";

async function main() {
  const ItPubTokenContract = await ethers.getContractFactory("ItPubToken");
  const itPubTokenContract = await ItPubTokenContract.deploy();

  await itPubTokenContract.deployed();

  console.log("Contract deployed to:", itPubTokenContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
