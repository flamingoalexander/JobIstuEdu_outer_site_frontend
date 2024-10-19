import axios from "axios";
class AuthService {
    static async login(username, password) {
        try {
            const response = await axios.post('/api/out/base/auth/', { username, password });
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
            }
            if (response.data.refresh) {
                localStorage.setItem('refresh_token', response.data.refresh);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    static async register(username, email, password) {
        try {
            const response = await this.apiClient.post('/register', { username, email, password });
            return response;
        } catch (error) {
            throw error;
        }
    }

    static getCurrentUser() {
        // Реализация получения текущего пользователя, если требуется
    }
}

export default AuthService;