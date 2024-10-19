import axios from "axios";
import $api from "@/services/Api.js";
class AuthService {
    async login(username, password) {
        try {
            const response = await axios.post('/api/out/base/auth/', { username, password });
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        // Удаляем токен из localStorage
        localStorage.removeItem('access_token');
    }

    async register(username, email, password) {
        try {
            const response = await this.apiClient.post('/register', { username, email, password });
            return response;
        } catch (error) {
            throw error;
        }
    }

    getCurrentUser() {
        // Реализация получения текущего пользователя, если требуется
    }
}

export default new AuthService();