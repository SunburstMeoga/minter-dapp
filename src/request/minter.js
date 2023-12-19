import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let minterContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()

  const MT = new ethers.Contract(config.mt_addr, config.mt_abi, provider)
  const MTTRADE = new ethers.Contract(config.mt_addr, config.mt_abi, signer)

  minterContractApi = {
    //檢查MT對某個合約的授權狀態
    allowance: async function (walletAddr, contractAddress) {
      const result = await MTTRADE.allowance(walletAddr, contractAddress)
      return result
    },
    //MT對某個合約進行授權
    approve: async function (contractAddress) {
      const value = ethers.MaxUint256
      const tx = await MTTRADE.approve(contractAddress, value)
      const result = tx.wait()
      return result
    }
  }
}

export default minterContractApi
