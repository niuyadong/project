import axios from "axios";
import store from "../store"; // 导入 Vuex store
import Cookies from "js-cookie";

// 创建 axios 实例，设置基础 URL
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 使用环境变量中的 API URL
  timeout: 10000, // 设置请求超时时间
  headers: {
    "Content-Type": "application/json", // 默认使用 JSON 格式
  },
});

// 请求拦截器：可以统一处理请求，例如添加 token、日志记录等
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getters.token || Cookies.get("token"); // 获取 Vuex 中的 token 或 cookie 中的 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：可以统一处理响应，例如错误处理等
axiosInstance.interceptors.response.use(
  (response) => {
    // 这里你可以根据返回的数据格式做统一处理
    if (response.data.code !== 200) {
      // 如果响应数据中 code 不为 200，处理错误
      return Promise.reject(new Error(response.data.message || "API Error"));
    }
    return response.data; // 直接返回响应数据
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        store.dispatch("auth/clearToken"); // 清除 Vuex 和 cookie 中的 token
        // 可以在这里跳转到登录页，或显示登录过期提示
      } else if (status >= 500) {
        // 服务器错误处理
        return Promise.reject(
          new Error("服务器错误，稍后再试")
        );
      } else if (status === 404) {
        return Promise.reject(
          new Error("请求的资源未找到")
        );
      }
    } else {
      return Promise.reject(
        new Error("网络错误或请求超时")
      );
    }
    return Promise.reject(error); // 继续传递错误
  }
);

export default axiosInstance;
