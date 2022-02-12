import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "assets/css/base.css"
import "../public/font/iconfont.css"
import { Loading } from 'vant';
createApp(App).use(store).use(Loading).use(router).mount('#app')
