import axios from "axios";

class AuthService {
    static async login(authData) {
        try {
            const response = await axios.post('/api/out/base/auth/', {
                username: authData.username,
                password: authData.password
            }, {
                headers: {
                    rememberMe: authData.rememberMe
                }
            });

            if (response.data.access) {
                if (authData.rememberMe) {
                    localStorage.setItem('access_token', response.data.access);
                    if (response.data.refresh) {
                        localStorage.setItem('refresh_token', response.data.refresh);
                    }
                } else {
                    sessionStorage.setItem('access_token', response.data.access);
                    if (response.data.refresh) {
                        sessionStorage.setItem('refresh_token', response.data.refresh);
                    }
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
        
        await axios.post('/api/out/base/auth/log_out', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')}`,
                'Refresh-Token': refreshToken
            }
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
    }

    static getToken() {
        return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    }

    static getRefreshToken() {
        return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    }
}

export default AuthService;