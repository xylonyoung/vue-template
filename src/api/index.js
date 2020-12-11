import request from './request'
const api = {
  agreement: 'agreement',

}
class Api {
  constructor(api) {
    for (const key in api) {
      this[key] = {
        post: data => this.post(api[key], data),
        del: (id, data) => this.del(`${api[key]}/${id}`, data),
        put: data => this.put(api[key], data),
        putId: (id, data) => this.put(`${api[key]}/${id}`, data),
        get: data => this.get(api[key], data),
        getId: (id, data) => this.get(`${api[key]}/${id}`, data),
      }
    }
  }
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

  user = {
    get: data => this.get(`/api/user`, data),
    login: data => this.post(`/api-login`, data),
    putProfile: data => this.put(`/api/user-profile`, data),
  }
}

const $api = new Api(api)

export default $api
