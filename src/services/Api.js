import axios from "axios";

const API_URL = '/';
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
            if (error.response.data.messages[0].message === "Token is invalid or expired") {
                return axios.post(`/api/out/base/auth/refresh`).then(response => {
                    localStorage.setItem('access_token', response.data.access);
                    return $api.request(error.config);
                }).catch(() => {
                    localStorage.removeItem('access_token');
                    router.push({ name: 'auth' });
                });
            }
        }
        return Promise.reject(error);
    }
);
export async function getInstituteNameById(fuculty_id) {
    const response = await axios.get(`/api/out/legacy/faculty/${fuculty_id}`);
    return response.data.name;
}

export default $api;