# Simple ERC20 token implementation for crypton academy – ItPubToken, ITP

This project contains ERC-20 compatible token implementation, tests with 100% coverage and useful tasks


## How to deploy


```shell
npx hardhat deploy --network rinkeby
```


## How to check your balance


```shell
npx hardhat getBalance --contract-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --network rinkeby
```


## How to transfer money


```shell
npx hardhat transfer --contract-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --to-addr 0xD8Ea779b8FFC1096CA422D40588C4c0641709890 --value 10 --network rinkeby
```

## How to allows spender to withdraw money from your account 


```shell
npx hardhat approve --contract-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```

## How to transfer allowed money to another account 


```shell
npx hardhat transferFrom --contract-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --from-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --to-addr 0xEde64552FbfF05c7dc076468c3a70C6B17CB5a37 --value 10 --network rinkeby
```

## How to verify

```shell
npx hardhat verify 0x5FbDB2315678afecb367f032d93F642f64180aa3 --network rinkeby
```