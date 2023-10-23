import { config } from '@/const/config'
import axios from 'axios'

//操作記錄
export async function incomeList(address, type) {
  //  type: 1.直推收益 2.對碰收益 3.代數收益 4.加速器收益 5.業績承諾卡收益 6.每日收益 7.推薦福利收益
  const result = await axios.get(`${config.api}/income/${address}/${type}`)
  return result
}

//市場NFTs查詢
export async function marketNFTs(type) {
  //  type: 1.200配套 2.600配套 3.2000配套 4.6000配套 5.20000配套
  const result = await axios.get(`${config.api}/nft/buy/${type}`)
  return result
}

//查询指定地址的NFT列表数据
export async function addressNFTs(walletAddr) {
  const result = await axios.get(`${config.api}/nft/user/${walletAddr}`)
  return result
}

//抽獎
export async function userRaffle(walletAddr, tokenId) {
  const result = await axios.get(`${config.api}/game/draw/${walletAddr}/${tokenId}`)
  return result
}
