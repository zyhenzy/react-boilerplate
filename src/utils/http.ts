import axios, { AxiosResponse } from 'axios';

// 创建 axios 实例
const http = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || '', // 可根据需要设置
  baseURL: '/api', // 可根据需要设置
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等操作
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers = config.headers || {};
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    // 可以统一处理错误
    return Promise.reject(error);
  }
);

export default http;

