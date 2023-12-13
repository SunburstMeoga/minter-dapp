import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let nftContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()

  const NFT = new ethers.Contract(config.nfts_marketplace_addr, config.burnable_token_abi, provider)
  const NFTTRADE = new ethers.Contract(
    config.nfts_marketplace_addr,
    config.burnable_token_abi,
    signer
  )
  const PMTTRADE = new ethers.Contract(config.pmt_addr, config.burnable_token_abi, signer)

  nftContractApi = {
    //檢查pmt對某個合約的授權狀態
    allowance: async function (walletAddr, contractAddress) {
      const result = await PMTTRADE.allowance(walletAddr, contractAddress)
      return result
    },
    //pmt對某個合約進行授權
    approve: async function (contractAddress) {
      const value = ethers.MaxUint256
      const result = await PMTTRADE.approve(contractAddress, value)
      return result
    },
    //购买nft
    purchaseNFT: async function (nftID) {
      const result = await NFTTRADE.purchaseNFT(nftID)
      return result
    },
    //nft掛單
    listNFT: async function (nftID) {
      const result = await NFTTRADE.listNFT(nftID)
      return result
    },
    //下架NFT
    unlistNFT: async function (nftID) {
      const result = await NFTTRADE.unlistNFT(nftID)
      return result
    }
  }
}

export default nftContractApi
