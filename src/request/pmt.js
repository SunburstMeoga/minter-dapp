import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let pmtContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()
  const PMTTOKEN = new ethers.Contract(config.pmt_addr, config.pmt_abi, provider)
  const PMTTOKENTRADE = new ethers.Contract(config.pmt_addr, config.pmt_abi, signer)

  const PMT = new ethers.Contract(config.pmt_purchase_addr, config.pmt_purchase_abi, provider)
  const PMTTRADE = new ethers.Contract(config.pmt_purchase_addr, config.pmt_purchase_abi, signer)
  //使用usdt購買package
  pmtContractApi = {
    //檢查MT對某個合約的授權狀態
    purchasePackage: async function (packageId) {
      const result = await PMTTRADE.purchasePackage(packageId)
      return result
    },
    balanceOf: async function (walletAddr) {
      const PMTERC20 = new ethers.Contract(config.pmt_addr, config.burnable_token_abi, signer)
      const result = await PMTERC20.balanceOf(walletAddr)
      return result
    },
    //已提現總數
    getWithdrawalAmount: async function (walletAddr) {
      const result = await PMT.getWithdrawalAmount(walletAddr)
      return result
    },
    //可提現上限
    getWithdrawalAmountLimit: async function (walletAddr) {
      const result = await PMT.getWithdrawalAmountLimit(walletAddr)
      return result
    },
    //現時收益總數
    getRewardAmount: async function (walletAddr) {
      const result = await PMT.getRewardAmount(walletAddr)
      return result
    },
    //收益上限
    getRewardAmountLimit: async function (walletAddr) {
      const result = await PMT.getRewardAmountLimit(walletAddr)
      return result
    },
    //釋放鎖定的代幣
    releaseTokens: async function () {
      const result = await PMTTOKENTRADE.releaseTokens()
      return result
    },
    //獲取地址鎖定的代幣數量
    getLockedAmount: async function (walletAddr) {
      const result = await PMTTOKEN.getLockedAmount(walletAddr)
      return result
    },
    //獲取地址剩餘的鎖定期
    getRemainingLockupPeriod: async function (walletAddr) {
      const result = await PMTTOKEN.getRemainingLockupPeriod(walletAddr)
      return result
    }
  }
}

export default pmtContractApi
