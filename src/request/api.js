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
  return request('/players/check', {
    method: 'GET',
    params
  })
}

//購買配套
export function buyCoherent(data) {
  return request('packages/buy', {
    method: 'POST',
    data
  })
}
