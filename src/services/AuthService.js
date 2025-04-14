import axios from "axios";

class AuthService {
    static async login(authData) {
        try {
            const response = await axios.post('/api/out/base/auth/', {
                username: authData.username,
                password: authData.password,
                rememberMe: authData.rememberMe
            });
            if (response.data.access) {
                if (authData.rememberMe) {
                    localStorage.setItem('access_token', response.data.access);
                } else {
                    sessionStorage.setItem('access_token', response.data.access);
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        await axios.post('/api/out/base/auth/log_out', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')}`,
            }
        });
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
    }

    static getToken() {
        return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    }
}

export default AuthService;