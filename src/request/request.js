import axios from 'axios'
import { login } from '@/request/api'
import Web3 from "web3";
import { generateNonce } from '@/utils/getNonce'


// request.js
// 创建新的axios实例
const service = axios.create({
  // 环境变量，需要在.env文件中配置
  baseURL: 'http://13.228.135.184:8001/api',
  // baseURL: 'https://api.minter-x.com/api',
  // 超时时间暂定5s
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      config.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // closeToast()
    // 处理异常情况，根据项目实际情况处理或不处理
    if (error && error.response) {
      // 根据约定的响应码处理
      switch (error.response.status) {
        case 403:
          error.message = '拒绝访问'
          break
        case 502:
          error.message = '服务器端出错'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      error.message = '服务器响应超时，请刷新当前页'
    }
    //   showToast(error.message);
    return Promise.resolve(error.response)
  }
)

// 封装请求函数
const Request = (url, options = {}) => {
  let method = options.method || 'get'
  let params = options.params || {}
  let data = options.data || {}

  if (method === 'get' || method === 'GET') {
    return new Promise((resolve, reject) => {
      service
        .get(url, {
          params: params
        })
        .then((res) => {
          //console.log(res)
          if (res.status == 401 || res.status == 403) {
            addressSign()
            return
          }
          if (res && res.data) {

            resolve(res.data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      service
        .post(url, data)
        .then((res) => {
          if (res.status == 401) {
            addressSign()
            return
          }
          if (res && res.data) {
            //console.log(res)
            resolve(res.data, res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

async function addressSign() {
  const newAccounts = await ethereum.request({
    method: 'eth_requestAccounts',
  })
  localStorage.setItem('address', newAccounts[0])
  // userInfo.changeAddress(newAccounts[0])
  const web3 = new Web3(window.ethereum)
  let params = {}
  const randomString =
    "Welcome to Minter\n\nPlease click to sign in and accept the Minter Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n" +
    localStorage.getItem('address') +
    "\n\nNonece:\n" +
    generateNonce();
  try {
    const signature = await web3.eth.personal.sign(randomString, localStorage.getItem('address'), '')
    params = { randomString: randomString, signature: signature }
  } catch (err) {
    showToast('签名失败，请重试')
    return
  }


  login(params)
    .then(res => {
      //console.log(res)
      localStorage.setItem('token', res.access_token)
      localStorage.setItem('address', res.address)
      // userInfo.changeAddress(res.address)
      // proxy.$loading.hide()
      location.reload()
      // showToast('已登录')
    })
    .catch(err => {
      // proxy.$loading.hide()
      showToast('登录失败，请重试')
      //console.log(err)
    })
  // //console.log(signature)

}

export default Request
