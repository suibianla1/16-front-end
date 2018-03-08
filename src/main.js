// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import api, {domain} from './js/api.js'
import 'element-ui/lib/theme-chalk/index.css';

// import './assets/elementuiCss/index.css';
import './assets/site/css/style.css'
import './assets/css/style.css'

//导入vuex类库，该类库用于创建全局数据
import Vuex from 'vuex';
import storeCart from './store/cart.js';

Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.use(Vuex);


//设置默认域名
axios.defaults.baseURL = domain
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;


Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

//设置默认域名

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: new Vuex.Store(storeCart)
})
