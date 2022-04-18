import { task } from "hardhat/config";

task("allowance", "Get my allowance").addParam("contractAddr", "Address of the deployed contract")
    .addParam("owner", "Address of owner")
    .addParam("spender", "Address of spender")
    .setAction(async (taskArgs, hre) => {
        let [owner] = await hre.ethers.getSigners();


        const ItPubTokenContract = await hre.ethers.getContractFactory("ItPubToken");
        const itPubTokenContract = ItPubTokenContract.attach(taskArgs['contractAddr']);

        console.log(`Allowance: ${await itPubTokenContract.allowance(taskArgs['owner'], taskArgs['spender'])}, owner: ${owner.address}`);
    });

