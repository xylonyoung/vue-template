import { getLanguage } from '@/lang/index'

const state = {
  mobile: false,
  language: getLanguage(),
  cachedViews: [],
}

const mutations = {
  MOBILE_DEVICE: (state, isMobile) => {
    state.mobile = isMobile
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem('language', language)
  },
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  resize({ commit }, _this) {
    const isMobile = document.documentElement.clientWidth < 1226
    const container = document.getElementsByClassName('main-container')
    commit('MOBILE_DEVICE', isMobile)
    _this.$nextTick(() => {
      if (isMobile) {
        container.forEach(e => {
          e.style.width = '100%'
        })
      } else {
        container.forEach(e => {
          e.style.width = '1226px'
        })
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
