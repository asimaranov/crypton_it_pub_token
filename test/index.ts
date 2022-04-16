import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
  import { Contract } from "ethers";
import { ethers } from "hardhat";

const DECIMALS = 18;
const NAME = "ITPubToken";
const SYMBOL = "ITP";

const TOTAL_SUPPLY = 1_000_000;
const TOKENS_TO_TRANSFER = 1_000;

const TOKENS_TO_BURN = 10;
const TOKENS_TO_MINT = 10;


describe("ItPubToken contract", function () {
  let ItPubTokenContract;
  let itPubTokenContract: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];

  beforeEach(async () => {
    ItPubTokenContract = await ethers.getContractFactory('ItPubToken');
    [owner, user1, user2, ...users] = await ethers.getSigners();
    itPubTokenContract = await ItPubTokenContract.deploy();
  })

  describe("Initial params of contract", async () => {
    it("Check total supply correctness", async () => {
      expect(await itPubTokenContract.totalSupply()).to.equal(TOTAL_SUPPLY);
    })

    it("Check decimals supply correctness", async () => {
      expect(await itPubTokenContract.decimals()).to.equal(DECIMALS);
    })

    it("Check name correctness", async () => {
      expect(await itPubTokenContract.name()).to.equal(NAME);
    })

    it("Check symbol correctness", async () => {
      expect(await itPubTokenContract.symbol()).to.equal(SYMBOL);
    })

  })

  describe("Contract logic", function () {
    it("Check initial balance of the owner", async () => {
      expect(await itPubTokenContract.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("Check balance of user after transferring", async () => {

      let transferTransaction = await itPubTokenContract.transfer(user1.address, TOKENS_TO_TRANSFER);
      let rc = await transferTransaction.wait();
      const transferEvent = rc.events.find((event: { event: string; }) => event.event === 'Transfer');
      const [_from, _to, _value] = transferEvent.args;
      expect(_from).to.equal(owner.address);
      expect(_to).to.equal(user1.address);
      expect(_value).to.equal(TOKENS_TO_TRANSFER);

      expect(await itPubTokenContract.balanceOf(user1.address)).to.equal(TOKENS_TO_TRANSFER);
    })

    it("Check that it's impossible to transfer more money than user has", async () => {
      let initialUserBalance = await itPubTokenContract.balanceOf(user1.address)
      await expect(itPubTokenContract.transfer(user1.address, TOTAL_SUPPLY + 1)).to.be.revertedWith('Not enough money');
      expect(await itPubTokenContract.balanceOf(user1.address)).to.equal(initialUserBalance);
    })

    it("Check approving correctness", async () => {
      expect(await itPubTokenContract.allowance(owner.address, user1.address)).to.equal(0);
      let approvingTransaction = await itPubTokenContract.approve(user1.address, TOKENS_TO_TRANSFER);
      expect(await itPubTokenContract.allowance(owner.address, user1.address)).to.equal(TOKENS_TO_TRANSFER);

      let rcApproving = await approvingTransaction.wait();
      const approvalEvent = rcApproving.events.find((event: { event: string; }) => event.event === 'Approval');
      const [_owner, _spender, _value] = approvalEvent.args;
      expect(_owner).to.equal(owner.address);
      expect(_spender).to.equal(user1.address);
      expect(_value).to.equal(TOKENS_TO_TRANSFER);
    });


    it("Check that transferFrom fails if not allowed", async () => {
      await expect(itPubTokenContract.transferFrom(owner.address, user1.address, 1)).to.be.revertedWith("Not permitted");
      await itPubTokenContract.approve(user1.address, TOKENS_TO_TRANSFER);
      await expect(itPubTokenContract.transferFrom(owner.address, user1.address, TOKENS_TO_TRANSFER + 1)).to.be.revertedWith("Not permitted");

    })

    it("Check transferFrom after approving", async () => {
      await itPubTokenContract.approve(user1.address, TOKENS_TO_TRANSFER);

      const transferFromTransaction = await itPubTokenContract.transferFrom(owner.address, user1.address, TOKENS_TO_TRANSFER);

      const rc = await transferFromTransaction.wait();

      const transferEvent = rc.events.find((event: { event: string; }) => event.event === 'Transfer');
      const [_from, _to, _value] = transferEvent.args;
      expect(_from).to.equal(owner.address);
      expect(_to).to.equal(user1.address);
      expect(_value).to.equal(TOKENS_TO_TRANSFER);

    })

    it("Check transferFrom with not enough money", async () => {
      await itPubTokenContract.approve(user1.address, TOTAL_SUPPLY + 1);
      await expect(itPubTokenContract.transferFrom(owner.address, user1.address, TOTAL_SUPPLY + 1)).to.be.revertedWith("Not enough money");
    })

    it("Check burn correctness", async () => {
      const initialUserBalance = await itPubTokenContract.balanceOf(owner.address);
      await itPubTokenContract.burn(TOKENS_TO_BURN);
      expect(await itPubTokenContract.totalSupply()).to.equal(TOTAL_SUPPLY - TOKENS_TO_BURN);
      expect(initialUserBalance - await itPubTokenContract.balanceOf(owner.address)).to.equal(TOKENS_TO_BURN);
    })

    it("Check that burn fails if not enough money", async () => {
      await expect(itPubTokenContract.burn(TOTAL_SUPPLY + 1)).to.be.revertedWith('Not enough money');
    })

    it("Check mint correctness", async () => {
      await itPubTokenContract.mint(TOKENS_TO_MINT);
      expect(await itPubTokenContract.totalSupply()).to.equal(TOTAL_SUPPLY + TOKENS_TO_MINT);
      expect(await itPubTokenContract.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY + TOKENS_TO_MINT);
    })
    it("Check mint access control", async () => {
      await expect(itPubTokenContract.connect(user1).mint(TOKENS_TO_MINT)).to.revertedWith("Only owner can do that");
    })


  })
});
