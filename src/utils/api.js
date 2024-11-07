import qs from "qs";
import axiosInstance from "./axios";

// 通用请求方法封装
const request = function ({ url, method, data, headers = {} }) {
  const config = {
    url,
    method,
    headers: { ...headers }, // 合并传入的 headers
    data,
  };

  // 如果 data 是 FormData 类型，自动设置 'Content-Type'
  if (data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (data && typeof data === "object") {
    // 如果是对象，按 'x-www-form-urlencoded' 发送
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.data = qs.stringify(data);
  }

  return axiosInstance(config); // 使用 axiosInstance 发起请求
};

// 封装不同请求方式的 API 方法
export default {
  get(url, params = {}, headers = {}) {
    return request({
      url,
      method: "get",
      data: params,
      headers,
    });
  },
  post(url, data = {}, headers = {}) {
    return request({
      url,
      method: "post",
      data,
      headers,
    });
  },
  put(url, data = {}, headers = {}) {
    return request({
      url,
      method: "put",
      data,
      headers,
    });
  },
  delete(url, data = {}, headers = {}) {
    return request({
      url,
      method: "delete",
      data,
      headers,
    });
  },
};
