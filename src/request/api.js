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
export function marketplace(params) {
  return request('/marketplaces', {
    method: 'GET',
    params
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
export function userNFT(params) {
  console.log(params)
  return request('/nfts', {
    method: 'GET',
    params
  })
}

//獲取玩家資料

export function playersInfo(address) {
  return request('/players/' + address, {
    method: 'GET'
  })
}

//動態收益種類
export function dynamicEarningTypes() {
  return request('/dynamic_earning_types', {
    method: 'GET'
  })
}

//動態收益記錄
export function dynamicRecords(params) {
  return request('/dynamic_records', {
    method: 'GET',
    params
  })
}

//靜態收益記錄
export function staticRecords(params) {
  return request('/static_records', {
    method: 'GET',
    params
  })
}
//获取绑定rt余额
export function rtBindBalance() {
  return request('/players/balances/rt', {
    method: 'GET'
  })
}
//查看rt餘額
export function rtBalance(params) {
  return request('/players/rt-balance', {
    method: 'GET',
    params
  })
}

//查看bt餘額
export function btBalance(params) {
  return request('/players/bt-balance', {
    method: 'GET',
    params
  })
}

//邀請至樹狀圖
export function joinTheThree(data) {
  return request('/players/join-the-tree', {
    method: 'POST',
    data
  })
}
//bt兌換usdt
export function btToUsdt(data) {
  return request('/exchanges/bt-to-usdt', {
    method: 'POST',
    data
  })
}
//bt兌換rt
export function btToRt(data) {
  return request('/exchanges/bt-to-rt', {
    method: 'POST',
    data
  })
}

//獲取自己可出售的NFT
export function getCanSaleNFT(params) {
  return request('/nfts/available', {
    method: 'GET',
    params
  })
}

//幫下級購買配套地址
export function buyPackageToNext(data) {
  return request('/packages/buy-for-designated-address', {
    method: 'POST',
    data
  })
}

//更新rt價格
export function updataRTBalance(address) {
  return request('/players/update-rt-balance/' + address, {
    method: 'GET'
  })
}

//獲取抽獎結果
export function getLuckyDraw(params) {
  return request('/lucky-draw', {
    method: 'GET',
    params
  })
}

//rt轉賬
export function transfersRT(data) {
  return request('/transfers/rt', {
    method: 'POST',
    data
  })
}

//檢查當前賬戶有沒有購買配套
export function checkPackageCount() {
  return request('/players/package-check', {
    method: 'GET'
  })
}

//RT兌換記錄
// export function tokenExhange(params) {
//   return request('/exchange_records/rt', {
//     method: 'GET',
//     params
//   })
// }

//nft购买记录
export function nftTransaction(params) {
  return request('/nft_transactions', {
    method: 'GET',
    params
  })
}
//nft掛單記錄
export function nftMarketplace(params) {
  return request('/nft_transactions/log', {
    method: 'GET',
    params
  })
}
//nft出售记录
export function nftSale(params) {
  return request('/nft_transactions/sell-records', {
    method: 'GET',
    params
  })
}

//rt兑换记录
export function RTExchangeRecord(params) {
  return request('/exchange_records/rt', {
    method: 'GET',
    params
  })
}

//usdt兌換記錄
export function usdtExchangeRecord(params) {
  return request('/records/swaps/usdt', {
    method: 'GET',
    params
  })
}

//bt兌換記錄
export function btExchangeRecord(params) {
  return request('/records/swaps/bt', {
    method: 'GET',
    params
  })
}

//mt兌換記錄
export function mtExchangeRecord(params) {
  return request('/records/swaps/mt', {
    method: 'GET',
    params
  })
}
//usdt交易記錄
export function usdtTransations(params) {
  return request('records/transactions/usdt', {
    method: 'GET',
    params
  })
}
//bt交易記錄
export function btTransations(params) {
  return request('/records/transactions/bt', {
    method: 'GET',
    params
  })
}
//rt交易記錄
export function rtTransations(params) {
  return request('/records/transactions/rt', {
    method: 'GET',
    params
  })
}
//mt交易记录
export function mtTransations(params) {
  return request('/records/transactions/mt', {
    method: 'GET',
    params
  })
}
//pmt交易记录
export function pmtTransations(params) {
  return request('/records/transactions/pmt', {
    method: 'GET',
    params
  })
}
//檢查玩家是否在自己腳下
export function checkAddressInTree(address) {
  return request('/players/check-in-tree/' + address, {
    method: 'GET'
  })
}