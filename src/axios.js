// 自定义插件模块
// axios
// axios 不是 vue 插件
import axios from 'axios'
// import qs from 'qs'
const MyHttpServer ={}

MyHttpServer.install =(Vue)=> {
    // 4. 添加实例方法
    axios.defaults.baseURL = 'http://localhost:8080/wsn'
    // axios.defaults.withCredentials=true

    // // 添加请求拦截器
    // axios.interceptors.request.use(function (config) {
    //   if(config.method === 'post') {
    //       config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //       config.data = qs.stringify(config.data)
    // }

    
    //     return config;  //添加这一行

    //  });

    Vue.prototype.$http = axios
  }

export default MyHttpServer

// 使用 this.$http.get('网址')