import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let mstContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()

  const MST = new ethers.Contract(config.mst_addr, config.burnable_token_abi, provider)
  const MSTTRADE = new ethers.Contract(config.mst_addr, config.burnable_token_abi, signer)

  mstContractApi = {
    //檢查USDT對某個合約的授權狀態
    // allowance: async function (walletAddr, contractAddress) {
    //   const result = await USDTTRADE.allowance(walletAddr, contractAddress)
    //   return result
    // },
    // //USDT對某個合約進行授權
    // approve: async function (contractAddress) {
    //   const value = ethers.MaxUint256
    //   const result = await USDTTRADE.approve(contractAddress, value)
    //   return result
    // },
    balanceOf: async function (walletAddr) {
      const result = await MST.balanceOf(walletAddr)
      return result
    }
  }
}

export default mstContractApi
