# Simple ERC20 token implementation for crypton academy – ItPubToken, ITP

This project contains ERC-20 compatible token implementation, tests with 100% coverage and useful tasks


## How to deploy


```shell
npx hardhat deploy --network rinkeby
```

Or

```shell
npx hardhat run scripts/deploy.ts --network rinkeby
```

## How to get total supply


```shell
npx hardhat totalSupply --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --network rinkeby
```


## How to check your balance


```shell
npx hardhat balanceOf --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --network rinkeby
```


## How to transfer tokens


```shell
npx hardhat transfer --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --to-addr 0xD8Ea779b8FFC1096CA422D40588C4c0641709890 --value 10 --network rinkeby
```

## How to allows spender to withdraw tokens from your account 


```shell
npx hardhat approve --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```

## How to transfer allowed tokens to another account 


```shell
npx hardhat transferFrom --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --from-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```


## How to burn tokens


```shell
npx hardhat burn --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --value 10 --network rinkeby
```

## How to mint tokens (only for owner)


```shell
npx hardhat burn --contract-addr 0x6c798973bC66aa4556251e21058f89C942F45dC7 --value 10 --network rinkeby
```


## How to verify

```shell
npx hardhat verify 0x6c798973bC66aa4556251e21058f89C942F45dC7 --network rinkeby
```


## Contract verification link
https://rinkeby.etherscan.io/address/0x6c798973bC66aa4556251e21058f89C942F45dC7#code