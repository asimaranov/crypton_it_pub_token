# Simple ERC20 token implementation for crypton academy – ItPubToken, ITP

This project contains ERC-20 compatible token implementation, tests with 100% coverage and useful tasks


## Token addresses
– Rinkeby: 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6
– Ropstein: 0x90556C343650C3ae2e5700f139dAde3c1C9Cb82E

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
npx hardhat totalSupply --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --network rinkeby
```


## How to check your balance


```shell
npx hardhat balanceOf --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --network rinkeby
```


## How to transfer tokens


```shell
npx hardhat transfer --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --to-addr 0xD8Ea779b8FFC1096CA422D40588C4c0641709890 --value 10 --network rinkeby
```

## How to allows spender to withdraw tokens from your account 


```shell
npx hardhat approve --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```

## How to transfer allowed tokens to another account 


```shell
npx hardhat transferFrom --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --from-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```


## How to burn tokens


```shell
npx hardhat burn --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --value 10 --network rinkeby
```

## How to mint tokens (only for owner)


```shell
npx hardhat mint --contract-addr 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --value 10 --network rinkeby
```


## How to verify

```shell
npx hardhat verify 0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6 --network rinkeby
```


## Contract verification link
https://rinkeby.etherscan.io/address/0xE1103FAFa665FDB0350A0cDFbfDcB88C7570eeE6#code