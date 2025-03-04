import { createStore } from 'vuex'
import state from './state'
import getters from "./getter"
import mutations from "./mutation";
import actions from "./action";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
