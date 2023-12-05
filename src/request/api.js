import request from './request'

//登录
export function login(params) {
  return request('/players/login', {
    method: 'POST',
    params: params
  })
}
