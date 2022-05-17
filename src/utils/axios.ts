import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

// 获取Token
const AUTH_TOKEN: () => string | boolean = () =>
  window.localStorage.getItem('_AUTH_TOKEN') || false

const instance = axios.create()
// 设置基本请求源
instance.defaults.baseURL = import.meta.env.VITE_BASE_URL
instance.defaults.timeout = 8000
instance.defaults.withCredentials = false
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.transformRequest = (data) => qs.stringify(data)
// 状态码大于400的都将视作失败
instance.defaults.validateStatus = (status) => status >= 200 && status <= 400
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    config.headers!.Authorization = AUTH_TOKEN()
    return config
  },
  () =>
    // 对请求错误做些什么
    Promise.reject(new Error('请求未发送'))
)
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { data, status, statusText, headers, config, request } = response
    return response
  },
  (error) => {
    if (!window.navigator.onLine) {
      // 断网处理比如跳转到断网页面
      Toast.fail('网络异常，请检查网络')
      return Promise.reject(error)
    }
    if (!error.response) {
      Toast.fail('系统繁忙，请稍后再试')
      return Promise.reject(error)
    }
    // 统一处理400以上的状态码
    if (error.response.status === 401) {
      Toast.fail('用户未认证')
    } else if (error.response.status === 403) {
      Toast.fail('token过期了')
    } else if (error.response.status === 404) {
      Toast.fail('访问内容不存在')
    } else if (error.response.status === 500) {
      Toast.fail('系统繁忙，请稍后再试')
    }
    return Promise.reject(error)
  }
)

const httpRequest = (url: string, type = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    const option = {
      url,
      method: type
    } as AxiosRequestConfig
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    instance(option)
      .then((res: AxiosResponse) => {
        if (res.status === 200 || res.status === 201) {
          resolve(res.data)
        } else {
          // 此处可统一处理非200-400之间的状态码
          Toast.fail(res.data.msg)
          reject(res.data)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default httpRequest
