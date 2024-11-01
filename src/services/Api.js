import axios from "axios";

const API_URL = '/api';
import router from "@/router";

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 10000,
});

$api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            console.log(error.response);
            if (error.response.data.messages[0].message === "Token is invalid or expired") {
                return axios.post(`${API_URL}/out/base/auth/refresh`).then(response => {
                    localStorage.setItem('access_token', response.data.access);
                    return $api.request(error.config);
                }).catch(() => {
                    localStorage.removeItem('access_token');
                    router.push({ name: 'auth' });
                });
            }
        }
        console.log(error.response.data);
        return Promise.reject(error);
    }
);


export default $api;