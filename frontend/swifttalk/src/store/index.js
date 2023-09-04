import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user=user
    },
    clearUser(state){
      state.user=null
    }
  },
  actions: {
    login({ commit }, user) {
      // 处理登录逻辑，例如向后端发送登录请求
      // 登录成功后，将用户信息传递给 setUser mutation
      commit('setUser', user);
    },
    logout({ commit }) {
      // 处理登出逻辑，例如清除用户信息
      commit('clearUser');
    },
  },
  modules: {
  }
})
