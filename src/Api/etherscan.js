import etherscanApi from 'etherscan-api'
import { config } from '../config'

const api = etherscanApi.init(config.etherscanApiKey)

export function getMinedBlocks (address) {
  return api.account.getminedblocks(address)
}

export function getEthSupply (resolve, reject) {
  api.stats.ethsupply()
    .then(result => resolve(result))
    .catch(error => reject(error))
}

export function getEthPrice (resolve, reject) {
  api.stats.ethprice()
    .then(result => resolve(result))
    .catch(error => reject(error))
}
