import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";
const API_URL = '/';


class UserApiService {
    static rememberMe = null;
    static axiosInstance = null;
    static initAxiosInstance() {
        this.axiosInstance = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            timeout: 10000,
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + this.getToken();
                }
                else {
                    throw new Error(`Token does not exist ${token}`);
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response.status === 401 && error.response.data.messages[0].message === "Token is invalid or expired") {
                    if (this.rememberMe) {
                        try {
                            const updatedAccessToken = (await axios.post(`/api/out/base/auth/refresh`)).data.access;
                            localStorage.setItem('access_token', updatedAccessToken);
                            return this.axiosInstance.request(error.config);

                        } catch (refreshError) {
                            localStorage.removeItem('access_token');
                            await router.push({ name: 'auth' });
                        }
                    } else {
                        sessionStorage.removeItem('access_token');
                        await router.push({ name: 'auth' });
                    }
                }
                ElMessage({
                    message: "Неизвестная ошибка",
                    type: 'error'
                });
            }
        );
    }
    static getAxiosInstance() {
        if (!this.axiosInstance) {
            this.initAxiosInstance();
        }
        return this.axiosInstance;
    }
    static async login(authData) {
        this.getAxiosInstance();
        try {
            this.rememberMe = authData.rememberMe;
            const response = await axios.post('/api/out/base/auth/', {
                username: authData.username,
                password: authData.password,
                rememberMe: authData.rememberMe
            });
            if (response.data.access) {
                if (response.data.rememberMe) {
                    localStorage.setItem('access_token', response.data.access);
                } else {
                    sessionStorage.setItem('access_token', response.data.access);
                }
                return response;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        const $api = this.getAxiosInstance();
        await $api.post('/api/out/base/auth/log_out');
        if (this.rememberMe) {
            localStorage.removeItem('access_token');
        }
        else {
            sessionStorage.removeItem('access_token');
        }
        this.rememberMe = null;
    }

    static getToken() {
        return this.rememberMe ? localStorage.getItem('access_token') : sessionStorage.getItem('access_token');
    }
}

export default UserApiService;