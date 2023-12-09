import request from './request'

//登录
export function login(params) {
  return request('/players/login', {
    method: 'POST',
    params: params
  })
}

//查看是否足夠rt餘額
export function adequateBalance(params) {
  return request('/players/check', {
    method: 'GET',
    params: params
  })
}

//購買配套
export function buyCoherent(params) {
  return request('packages/buy', {
    method: 'POST',
    params: params
  })
}
