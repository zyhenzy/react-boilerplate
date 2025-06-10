import axios, {AxiosResponse} from 'axios';
import { getCookie } from './cookie';

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
        // 从cookie中获取token
        const token = getCookie('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;
        if (data.code === 0) {
            return data.result;
        } else if (data.code === -1) {
            // todo:统一处理异常，抛出data.message
            return Promise.reject(new Error(data.message || '请求失败'));
        } else {
            return Promise.reject(new Error(data.message || '请求失败'));
        }
    },
    (error) => {
        // 可以统一处理错误
        return Promise.reject(error);
    }
);

export default http;
