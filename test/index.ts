import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const MONEY_TO_TRANSFER = 1_000;
const TOTAL_SUPPLY = 1_000_000;

describe("ItPubToken contract", function () {
  let ItPubTokenContract;
  let itPubTokenContract: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];
  beforeEach(async () => {
    ItPubTokenContract = await ethers.getContractFactory('ItPubToken');
    [owner, user1, user2, ...users] = await ethers.getSigners();
    itPubTokenContract = await ItPubTokenContract.deploy();

  })

  describe("", function () {
    it("Check initial balance of the owner", async () => {
      expect(await itPubTokenContract.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("Check balance of user after transferring", async () => {

      let transferTransaction = await itPubTokenContract.transfer(user1.address, MONEY_TO_TRANSFER);
      let rc = await transferTransaction.wait();
      const transferEvent = rc.events.find((event: { event: string; }) => event.event === 'Transfer');
      const [_from, _to, _value] = transferEvent.args;
      expect(_from).to.equal(owner.address);
      expect(_to).to.equal(user1.address);
      expect(_value).to.equal(MONEY_TO_TRANSFER);

      expect(await itPubTokenContract.balanceOf(user1.address)).to.equal(MONEY_TO_TRANSFER);
    })

    it("Check that it's impossible to transfer more money than user has", async () => {
      let initialUserBalance = await itPubTokenContract.balanceOf(user1.address)
      expect(itPubTokenContract.transfer(user1.address, TOTAL_SUPPLY + 1)).to.be.revertedWith('Not enough money');
      expect(await itPubTokenContract.balanceOf(user1.address)).to.equal(initialUserBalance);
    })
    it("Check approving", async () => {
      
      {
        expect(await itPubTokenContract.allowance(owner.address, user1.address)).to.equal(0);
        let approvingTransaction = await itPubTokenContract.approve(user1.address, MONEY_TO_TRANSFER);
        expect(await itPubTokenContract.allowance(owner.address, user1.address)).to.equal(MONEY_TO_TRANSFER);

        let rcApproving = await approvingTransaction.wait();
        const approvalEvent = rcApproving.events.find((event: { event: string; }) => event.event === 'Approval');
        const [_owner, _spender, _value] = approvalEvent.args;
        expect(_owner).to.equal(owner.address);
        expect(_spender).to.equal(user1.address);
        expect(_value).to.equal(MONEY_TO_TRANSFER);
      }

      expect(itPubTokenContract.transferFrom(owner.address, user1.address, MONEY_TO_TRANSFER + 1)).to.be.revertedWith("Not permitted");

      {
        const transferFromTransaction = await itPubTokenContract.transferFrom(owner.address, user1.address, MONEY_TO_TRANSFER);

        const rc = await transferFromTransaction.wait();

        const transferEvent = rc.events.find((event: { event: string; }) => event.event === 'Transfer');
        const [_from, _to, _value] = transferEvent.args;
        expect(_from).to.equal(owner.address);
        expect(_to).to.equal(user1.address);
        expect(_value).to.equal(MONEY_TO_TRANSFER);
      }

      {
        await itPubTokenContract.approve(user1.address, TOTAL_SUPPLY + 1);
        expect(itPubTokenContract.transferFrom(owner.address, user1.address, TOTAL_SUPPLY + 1)).to.be.revertedWith("Not enough money");

      }
    })
  })
});
