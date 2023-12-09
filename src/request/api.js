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
