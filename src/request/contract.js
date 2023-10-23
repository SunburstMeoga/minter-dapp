import { ethers } from 'ethers'
import { config } from '@/const/config'

const p = new ethers.JsonRpcApiProvider(config.rpc)
const MUSDT = new ethers.Contract(config.musdt_addr)

provider = new ethers.BrowserProvider(window.ethereum)
signer = await provider.getSigner()

const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider)
const GAMETRADE = new ethers.Contract(config.game_addr, config.game_abi, signer)

//erc20授權
export async function erc20Approve(contractAddr) {
  const value = ethers.constants.MaxUint256
  const result = await MUSDT.approve(contractAddr, value)
  return result
}

//erc20授權狀態
export async function erc20ApprouveState(walletAddr, contractAddr) {
  const result = await MUSDT.allowance(walletAddr, contractAddr)
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
    coherentType,
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
  const result = await GAME.spreads(walletAddr)
  return result
}
