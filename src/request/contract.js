import { ethers } from 'ethers'
import { config } from '@/const/config'
//console.log('config', config)

// const p = new ethers.JsonRpcProvider(config.rpc)
// const MUSDT = new ethers.Contract(config.musdt_addr, config.erc20, p)

const provider = new ethers.BrowserProvider(window.ethereum)

const signer = await provider.getSigner()

// const PMT = new ethers.Contract(config.pmt_purchase_addr, config.pmt_purchase_abi, provider)
const NFTS_COLLECTION = new ethers.Contract(
  config.nfts_collection_addr,
  config.nfts_collection_abi,
  provider
)
const NFTS_MARKETPLACE = new ethers.Contract(
  config.nfts_marketplace_addr,
  config.nfts_marketplace_abi,
  provider
)
const SWAP = new ethers.Contract(config.swap_addr, config.swap_abi, provider)
const SWAPTRADE = new ethers.Contract(config.swap_addr, config.swap_abi, signer)

const RT = new ethers.Contract(config.rt_addr, config.erc20_abi, provider)
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider)

const MUSDTTRADE = new ethers.Contract(config.musdt_addr, config.erc20_abi, signer)
const RTTRADE = new ethers.Contract(config.rt_addr, config.erc20_abi, signer)
const GAMETRADE = new ethers.Contract(config.game_addr, config.game_abi, signer)

export async function swapMTForUSDT(mtAmount) {
  const result = await SWAPTRADE.swapMTForUSDT(mtAmount)
  return result
}

//MUSDT erc20授權狀態
export async function MUSDTERC20AllowanceState(walletAddr) {
  const MT = new ethers.Contract(config.mt_addr, config.mt_abi, provider)
  const result = await MT.allowance(walletAddr, config.swap_addr)
  return result
}

//MUSDT erc20授權
export async function MUSDTERC20Approve() {
  const value = ethers.MaxUint256
  const result = await MUSDTTRADE.approve(config.musdt_addr, value)
  return result
}

//RT erc20授權狀態
export async function RTERC20AllowanceState(walletAddr) {
  const result = await RT.allowance(walletAddr, config.game_addr)
  return result
}

//RT erc20授權
export async function RTERC20Approve() {
  const value = ethers.MaxUint256
  const result = await RTTRADE.approve(config.rt_addr, value)
  return result
}

//查询地址的信息
export async function userInfo(walletAddr) {
  const result = await GAME.UserInfo(walletAddr)
  return result
}

//兌換 mt兌換usdt 支付10%手續費離場
export async function MTToUSDT(mtAmount) {
  const mt = ethers.parseEther(mtAmount)
  const result = await GAME.mt2usdt(mt)
  return result
}

//兌換 bt兌換usdt 支付10%手續費離場
export async function BTToUSDT(mtAmount) {
  const bt = ethers.parseEther(mtAmount)
  const result = await GAME.bt2usdt(bt)
  return result
}

// mt兌換rt繼續遊戲
export async function MTToRT() {
  const mt = ethers.parseEther('110')
  const result = await GAME.mt2rt(mt)
  return result
}

//購買配套
export async function buyCoherent(
  buyAddress,
  coherentType,
  isRT,
  directSuperior,
  meetWithSuperiors,
  isLeft
) {
  const tx = await GAMETRADE.buy(
    buyAddress,
    ethers.parseEther(coherentType),
    isRT,
    directSuperior,
    meetWithSuperiors,
    isLeft
  )
  const result = await tx.wait()
  return result
}

//購買nft
export async function buyNFT(tokenId, isPMT) {
  const tx = await GAMETRADE.buyNFT(tokenId, isPMT)
  const result = await tx.wait()
  return result
}

//分享樹查詢
export async function viewSpreads(walletAddr) {
  //console.log('walletAddr', walletAddr)
  const result = await GAME.spreads(walletAddr)
  return result
}
