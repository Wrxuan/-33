import Vue from 'vue'
import Vuex from 'vuex'
import createPresistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPresistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    SET_HISORIES(state, histories) {
      state.histories = histories
    }
  }
})
