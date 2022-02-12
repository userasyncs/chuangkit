import { createStore } from 'vuex'

export default createStore({
  state: {
    loadFlag:false
  },
  mutations: {
    changeFlag(state,value){
      state.loadFlag=value;
    }
  },
  actions: {
  },
  modules: {
  }
})
