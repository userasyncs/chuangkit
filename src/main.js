import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "assets/css/base.css"
import "../public/font/iconfont.css"
import { Loading } from 'vant';
import { List } from 'vant';
import { Lazyload } from 'vant';
createApp(App).use(store).use(Lazyload).use(Loading).use(List).use(router).mount('#app')
