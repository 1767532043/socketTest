import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import MyHttpServer from './axios.js'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.use(MyHttpServer)
Vue.prototype.$axios = axios
new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
