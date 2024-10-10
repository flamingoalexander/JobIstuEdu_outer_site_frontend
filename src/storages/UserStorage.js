import { defineStore } from "pinia";
import axios from "axios";
export const useUserStorage = defineStore("userStore", {
  state: () => ({
    user: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      is_staff: true,
      is_superuser: true,
    },
    auth: {
      username: "Не авторизован",
      password: "Не авторизован",
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setAuth(auth) {
      this.auth = auth;
    },
    async addUser() {
      axios.post("/api/out/base/user/add", this.user).then((res) => {});
    },
    async authInputUser (authHolder) {
        try {
            const response = await axios.post('/api/out/base/auth/', authHolder);

            this.user = response.data;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('auth', JSON.stringify(authHolder));

            this.setUser(JSON.parse(localStorage.getItem('user')));
            this.setAuth(JSON.parse(localStorage.getItem('auth')));

            return response;
        } catch (error) {
            throw error;
        }

    },
    async authUser() {
      try {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.auth = JSON.parse(localStorage.getItem("auth"));
      } catch (error) {
        console.error("Error fetching user data:", error);
        }
    },
  },
});
