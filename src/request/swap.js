import { ethers } from 'ethers'
import { config } from '@/const/config'
console.log(config)

let provider = {}
let signer = {}
let swapContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()

  const SWAP = new ethers.Contract(config.swap_addr, config.swap_abi, provider)
  const SWAPTRADE = new ethers.Contract(config.swap_addr, config.swap_abi, signer)

  swapContractApi = {
    //mt兌換成USDT
    swapMTForUSDT: async function (mtAmount) {
      const result = await SWAPTRADE.swapMTForUSDT(mtAmount)
      return result
    },
    //mt兌換成rt
    swapMTForRT: async function () {
      const result = await SWAPTRADE.swapMTForRT(mtAmount)
      return result
    },
    //mt兌換成rt
    swapUSDTForRT: async function () {
      const result = await SWAPTRADE.swapUSDTForRT(mtAmount)
      return result
    }
  }
}

export default swapContractApi
