import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vant from 'vant/lib/index.js';
import 'vant/lib/index.css';
import './assets/global.css';

Vue.use(Antd);
Vue.use(Vant);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
