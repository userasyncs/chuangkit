import { createStore } from 'vuex'

export default createStore({
  state: {
    loadFlag:false,
    result:{
      previewLoad:false,
      item:""
    },
    Proupshow:false,
    token:localStorage.getItem("token")
  },
  mutations: {
    changeFlag(state,value){
      state.loadFlag=value;
    },
    chanPreview(state,obj){
      state.result.previewLoad=obj.value;
      if (obj.item) {
        state.result.item=obj.item
      }
    },
    changeProupshow(state,value){
      state.Proupshow=value
    },
    changeToken(state,token){
      state.token=token;
    }
  },
  actions: {
  },
  modules: {
  }
})
