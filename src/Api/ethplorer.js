import { Ethplorer } from 'ethplorer-js'
import axios from 'axios'

const ethplorer = new Ethplorer()

export function getAddressInfo (address, resolve, reject) {
  ethplorer.getAddressInfo(address)
    .then(resolve, reject)
    .catch(reject)
}

export function getTokenInfo (address, resolve, reject) {
  const API = 'http://api.ethplorer.io'
  axios.get(`${API}/getTokenPriceHistoryGrouped/${address}?apiKey=freekey`, {
    params: {
      period: 30
    }
  })
    .then(response => resolve(response.data), reject)
    .catch(reject)
}

export default ethplorer