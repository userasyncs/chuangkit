import { createStore } from 'vuex'

export default createStore({
  state: {
    loadFlag:false,
    previewLoad:false
  },
  mutations: {
    changeFlag(state,value){
      state.loadFlag=value;
    },
    chanPreview(state,value){
      state.previewLoad=value;
    }
  },
  actions: {
  },
  modules: {
  }
})
