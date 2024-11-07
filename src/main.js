import Vue from "vue";
import App from "./App";
import store from "./store"; // 引入 store
import axios from "./utils/axios"; // 引入配置好的 axios 实例
import { router } from "./router";

// 将 axios 挂载到 Vue 原型上
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
