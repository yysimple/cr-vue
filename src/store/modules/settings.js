import variables from '@/styles/element-variables.scss'

const state = {
  theme: variables.theme,
  // 控制是否显示右侧系统布局配置
  showSettings: false,
  //  控制开启 Tags-View
  tagsView: false,
  // 是否固定 Header
  fixedHeader: true,
  // Whether show the logo in sidebar
  sidebarLogo: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

