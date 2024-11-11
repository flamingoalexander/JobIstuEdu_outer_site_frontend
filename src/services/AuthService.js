import axios from "axios";
class AuthService {
    static async login(username, password) {
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

    static async logout() {
        await axios.post('/api/out/base/auth/log_out', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        localStorage.removeItem('access_token');
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