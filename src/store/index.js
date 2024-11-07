import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import counter from "./modules/counter"; // 引入模块

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: Cookies.get("token") || "", // 从 cookie 获取 token 初始化
  },
  mutations: {
    // 更新 token，并将 token 存入 cookie
    setToken(state, token) {
      state.token = token;
      Cookies.set("token", token, { expires: 7 }); // 设置 token，有效期为 7 天
    },
    // 清除 token，并删除 cookie
    clearToken(state) {
      state.token = "";
      Cookies.remove("token");
    },
  },
  actions: {
    // 异步登录后设置 token
    login({ commit }, token) {
      commit("setToken", token);
    },
    // 异步登出
    logout({ commit }) {
      commit("clearToken");
    },
  },
  getters: {
    // 获取 token
    token: (state) => state.token,
  },
  modules: {
    counter, // 注册模块
  },
});
