import axios, {AxiosResponse} from 'axios';

// 创建 axios 实例
const http = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL || '', // 可根据需要设置
    baseURL: '/api', // 可根据需要设置
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 获取 cookie
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
}

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
        console.log(response)
        const data = response.data;
        if (data.code === 0) {
            return data;
        } else if (data.code === -1) {
            // 统一处理异常，抛出data.message
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

