import $api from '@/api'

const state = {
  token: null,
  user: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
}

const actions = {
  checkToken({ commit }) {
    if (localStorage.getItem('expired') > new Date().getTime()) {
      commit('SET_TOKEN', localStorage.getItem('token'))
    }
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      $api
        .post(`api-login`, { username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data)
          localStorage.setItem('token', data)
          //set token expire date
          localStorage.setItem(
            'expired',
            new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
          )
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      $api
        .get(`api/user`)
        .then(response => {
          const { data } = response
          commit('SET_USER', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER', {})
      commit('SET_TOKEN', null)
      localStorage.removeItem('token')
      resolve()
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
