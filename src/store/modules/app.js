import { getLanguage } from '@/lang/index'

const state = {
  mobile: false,
  language: getLanguage(),
  mainWidth: 0
}

const mutations = {
  MOBILE_DEVICE: (state, isMobile) => {
    state.mobile = isMobile
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem('language', language)
  },
  SET_MAIN_WIDTH: (state, width) => {
    state.mainWidth = width
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
