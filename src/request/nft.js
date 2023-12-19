import { ethers } from 'ethers'
import { config } from '@/const/config'

let provider = {}
let signer = {}
let nftContractApi = {}

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()
  const NFTOPERATING = new ethers.Contract(
    config.nfts_marketplace_addr,
    config.nfts_marketplace_abi,
    signer
  )
  const NFTGET = new ethers.Contract(
    config.nfts_marketplace_addr,
    config.nfts_marketplace_abi,
    provider
  )

  const MTCOLLECTION = new ethers.Contract(
    config.minter_collection,
    config.minter_collection_abi,
    signer
  )

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
      const tx = await PMTTRADE.approve(contractAddress, value)
      const result = tx.wait()
      return result
    },
    //购买nft
    purchaseNFT: async function (nftID) {
      const tx = await NFTOPERATING.purchaseNFT(nftID)
      const result = await tx.wait()
      return result
    },
    //nft掛單
    listNFT: async function (nftID) {
      const result = await NFTOPERATING.listNFT(nftID)
      return result
    },
    //下架NFT
    unlistNFT: async function (nftID) {
      const result = await NFTOPERATING.unlistNFT(nftID)
      return result
    },
    //獲取上市的所有nft
    getAllListedNFTs: async function () {
      const result = await NFTGET.getAllListedNFTs()
      return result
    },
    //授權狀態
    isApprovedAll: async function (walletAddr, contractAddress) {
      const result = await MTCOLLECTION.isApprovedForAll(walletAddr, contractAddress)
      // const result = await tx.wait()
      return result
    },
    setApprovalForAll: async function (contractAddress) {
      const tx = await MTCOLLECTION.setApprovalForAll(contractAddress, true)
      const result = await tx.wait()
      // cnsole.log(result, "发起MTCOLLECTION授权");
      return result
    },
    sellOffPeriod: async function (tokenID) {
      const result = await MTCOLLECTION.nonTradableUntil(tokenID)
      return result
    }
  }
}

export default nftContractApi
