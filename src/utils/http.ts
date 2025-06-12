import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from './cookie';

class HttpRequest {
    private instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.instance.interceptors.request.use(
            // @ts-ignore
            (config: AxiosRequestConfig) => {
                // 添加 token
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

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                const data = response.data;
                if (data.code === 0) {
                    return data.result;
                } else if (data.code === 401) {
                    // 未授权
                    console.log(data.message);
                    return Promise.reject(new Error(data.message || '未授权'));
                } else {
                    return Promise.reject(new Error(data.message || '请求失败'));
                }
            },
            (error) => {
                if (error.status === 401) {
                    console.log('未授权，请登录');
                    return Promise.resolve(error);
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }

    public get<T>(url: string, params?: any): Promise<T> {
        return this.instance.get(url, { params }) as Promise<T>;
    }

    public post<T>(url: string, data?: any): Promise<T> {
        return this.instance.post(url, data) as Promise<T>;
    }

    public put<T>(url: string, data?: any): Promise<T> {
        return this.instance.put(url, data) as Promise<T>;
    }

    public delete<T>(url: string, params?: any): Promise<T> {
        return this.instance.delete(url, { params }) as Promise<T>;
    }
}

const http = new HttpRequest('/api');

export default http;
