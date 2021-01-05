import request from './request'

class Api {
  post(url, data) {
    return request({ method: 'post', url, data })
  }

  del(url, data) {
    return request({ method: 'delete', url, params: { data } })
  }

  put(url, data) {
    return request({ method: 'put', url, params: { data } })
  }

  get(url, data) {
    return request({ method: 'get', url, params: { data } })
  }
}

export default new Api()
