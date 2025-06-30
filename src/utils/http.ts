import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from './cookie';
import i18n from '../i18n';

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
                const token = getCookie('pc-token');
                if (token) {
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                // 添加国际化语言
                if (i18n && i18n.language) {
                    const langValue = i18n.language === 'zh' ? 'zh-CN' : i18n.language;
                    config.headers = config.headers || {};
                    config.headers['Lang'] = langValue;
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
                } else {
                    return Promise.reject(new Error(data.message || '请求失败'));
                }
            },
            (error) => {
                if (error.status === 401) {
                    console.log('未授权，请登录');
                    debugger
                    window.location.href = '/login';
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

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config) as Promise<T>;
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
