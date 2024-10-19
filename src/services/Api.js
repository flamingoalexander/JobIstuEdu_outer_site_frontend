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

// $api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//
//             try {
//                 // Отправляем запрос на обновление токена
//                 const res = await axios.post(`${API_URL}api/out/base/auth/refresh`, {}, { withCredentials: true });
//                 const { accessToken } = res.data;
//
//                 // Сохраняем новый access токен
//                 localStorage.setItem('accessToken', accessToken);
//
//                 // Обновляем заголовок Authorization и повторяем оригинальный запрос
//                 originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
//                 return $api(originalRequest);
//             } catch (err) {
//                 // Если обновление токена не удалось, перенаправляем пользователя на страницу входа
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );


export default $api;