//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

uint256 constant INITIAL_SUPPLY = 1_000_000;

contract ItPubToken {
    uint8 public decimals = 1;
    uint256 public totalSupply = 0;

    string public name = "ITPubToken";
    string public symbol = "ITP";

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    function balanceOf(address _owner) public view returns (uint256 balance) {
        balance = _balances[_owner];
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        remaining = _allowances[_owner][_spender];
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(_balances[msg.sender] >= _value, "Not enough money");

        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        success = true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        _allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        success = true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_allowances[_from][_to] >= _value, "Not permitted");
        require(_balances[_from] >= _value, "Not enough money");

        _balances[_from] -= _value;
        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);

        success = true;
    }

    constructor() {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function _mint(address account, uint256 amount) internal {
        totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(_balances[account] >= amount, "Not enough money");
        totalSupply -= amount;
        _balances[account] -= amount;
        emit Transfer(account, address(0), amount);
    }
}
