import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "hardhat-abi-exporter";

import { utils, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });

import "./scripts/deploy";

const PRIVATE_KEY = process.env.PRIVATE_KEY || (Wallet.createRandom()).privateKey;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
      evmVersion: "istanbul"
    },
  },
  networks: {
    hardhat: {
      gasPrice: utils.parseUnits("60", "gwei").toNumber(),
    },
    mainnet: {
      url: "https://mainnet.ethernitychain.io",
      chainId: 183,
      accounts: [PRIVATE_KEY],
      // gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    testnet: {
      url: 'https://testnet.ethernitychain.io',
      chainId: 233,
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 20000000000,
    }
  },
  etherscan: {
    apiKey: {
      testnet: "ethernity_testnet", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "testnet",
        chainId: 233,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/233/etherscan",
          browserURL: "https://testnet.ernscan.io"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./build"
  },
  abiExporter: {
      path: "./dist/abi",
      clear: false,
      flat: true
    },
    typechain: {
      outDir: './dist/types',
      target: 'ethers-v5',
    },
  };

export default config;