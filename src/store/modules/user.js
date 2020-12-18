import $api from '@/api'
const state = {
  token: null,
  user: {},
  registered: false,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_REGISTERED: (state, registered) => {
    state.registered = registered
  },
}

const actions = {
  // user register
  register(userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      $api.user
        .register({ username: username.trim(), password: password })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      $api.user
        .login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data)
          localStorage.setItem('token', data)
          //set token expire date
          localStorage.setItem('expired', new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      $api.user
        .get(state.token)
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
