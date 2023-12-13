import request from './request'

//登录
export function login(data) {
  return request('/players/login', {
    method: 'POST',
    data
  })
}

//查看是否足夠rt餘額
export function adequateBalance(params) {
  return request('/packages/check', {
    method: 'GET',
    params
  })
}

//獲得某個地址的點位和pv值
export function addressLeg(address) {
  return request('/players/leg-tree/' + address, {
    method: 'GET'
  })
}

//購買配套
export function buyCoherent(data) {
  return request('packages/buy', {
    method: 'POST',
    data
  })
}

//檢查地址是否為有效地址
export function checkReferrerAddress(address) {
  return request('/players/check-address/' + address, {
    method: 'GET'
  })
}

//取得直推关系图
export function referrerMap(address) {
  return request('/players/direct-referrals/' + address, {
    method: 'GET'
  })
}

//为下级升级配套
export function upInferiorPackage(data) {
  return request('/packages/upgrade-for-designated-address', {
    method: 'POST',
    data
  })
}

//獲取nft列表市場
export function marketplace() {
  return request('/marketplaces', {
    method: 'GET'
  })
}

//獲取輪盤參數
export function roulettes() {
  return request('/roulettes', {
    method: 'GET'
  })
}

//抽獎
export function luckyDraw(data) {
  return request('/roulettes/lucky-draw', {
    method: 'POST',
    data
  })
}

//獲取自己的nfts
export function userNFT() {
  return request('/nfts', {
    method: 'GET'
  })
}

//獲取玩家資料
export function playersInfo(address) {
  return request('/players/' + address, {
    method: 'GET'
  })
}
