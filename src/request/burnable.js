import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let pmtContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()

  const PMT = new ethers.Contract(config.pmt_purchase_addr, config.burnable_token_abi, provider)
  const PMTTRADE = new ethers.Contract(config.pmt_purchase_addr, config.burnable_token_abi, signer)
  //使用usdt購買package
  burnableContractApi = {
    //檢查MT對某個合約的授權狀態
    purchasePackage: async function (packageId) {
      const result = await PMTTRADE.purchasePackage(packageId)
      return result
    }
  }
}

export default pmtContractApi
