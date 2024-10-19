import axios from "axios";

const API_URL = '/api';

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
        if (error.response.status === 401 && error.response.data.messages[0].message === "Token is invalid or expired") {
            try {
                return axios.post(`${API_URL}/out/base/auth/refresh`, {
                    refresh: localStorage.getItem('refresh_token'),
                }).then(response => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    return $api.request(error.config);
                });


            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);


export default $api;