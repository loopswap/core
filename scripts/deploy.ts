import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { utils } from 'ethers'
import { bytecode } from "../build/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Logger } from 'tslog'
import config from './config'
import UniswapV2Pair from "../build/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";

const logger: Logger = new Logger()

task('deploy-factory', 'Deploys Factory contract')
    .setAction(async (args, hre) => {
        const factory = await hre.ethers.getContractFactory(`contracts/UniswapV2Factory.sol:UniswapV2Factory`)
        const instance = await factory.deploy(config.zero)

        await instance.deployed()

        logger.info(instance.address)
    })

task('getHash', 'Get pair hash')
     .setAction(async (args, hre) => {
         const pairCodeHash = hre.ethers.utils.keccak256(`${UniswapV2Pair.bytecode}`)
         console.log(`Pair code hash: ${pairCodeHash}`)
     })

task('initHash', '')
    .setAction(async (args, hre) => {
        logger.info(utils.keccak256(bytecode))
        logger.info(utils.solidityKeccak256(['bytes'], [bytecode]))
    });