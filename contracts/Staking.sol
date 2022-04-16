//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

import "./ItPubToken.sol";

contract Staking {
    ItPubToken private stakingToken;
    ItPubToken private rewardToken;

    uint256 private percentage;

    address private _owner;

    uint256 private _stakingCooldown;
    uint256 private _rewardCooldown;

    mapping(address => uint256) private _stakings;
    mapping(address => uint256) private _rewards;

    mapping(address => uint256) private _stakingCooldowns;
    mapping(address => uint256) private _rewardCooldowns;

    function stake(uint256 amount) public {
        require(amount > 0, "Unable to stake 0 tokens");
        stakingToken.transferFrom(msg.sender, address(this), amount);
        _stakings[msg.sender] += amount;
        _rewards[msg.sender] += (amount * percentage) / 100;

        _stakingCooldowns[msg.sender] = block.timestamp + _stakingCooldown;
        _rewardCooldowns[msg.sender] = block.timestamp + _rewardCooldown;
    }

    function unstake() public {
        require(_stakingCooldowns[msg.sender] >= block.timestamp, "It's too early");
        require(_stakings[msg.sender] > 0, "You haven't deposited any money");

        rewardToken.transfer(msg.sender, _stakings[msg.sender]);
    }

    function claim() public {
        require(_rewardCooldowns[msg.sender] >= block.timestamp, "It's too early");
        require(_rewards[msg.sender] > 0, "You haven't deposited any money");
        _rewards[msg.sender] = 0;

        stakingToken.transfer(msg.sender, _rewards[msg.sender]);
    }

    constructor() {
        percentage = 20;
        stakingToken = ItPubToken(0xc8eeF11F258158d2B9981DD4cE305eACF33Bf8b6);
        rewardToken = ItPubToken(0xc8eeF11F258158d2B9981DD4cE305eACF33Bf8b6);

        _stakingCooldown = 20 minutes;
        _rewardCooldown = 10 minutes;

    }
}
