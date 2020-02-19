const state = {
  userInfo: {}
}

const mutations = {
  SET_USER: (state, user) => {
    state.userInfo = user
  },
  CLEAR_USER: (state) => {
    state.userInfo = {}
  }
}

const actions = {
  setUser({ commit }, data) {
    commit('SET_USER', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

