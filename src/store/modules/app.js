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
  mobileDevice({ commit }, isMobile) {
    commit('MOBILE_DEVICE', isMobile)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
