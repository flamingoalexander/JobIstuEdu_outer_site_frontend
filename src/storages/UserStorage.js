import { defineStore } from "pinia";
import axios from "axios";
import $api from "@/services/Api.js";

export const useUserStorage = defineStore("userStore", {
  state: () => ({
    user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        company_image: "",
        is_staff: null,
        is_superuser: null
    }
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    async addUser() {
      axios.post("/api/out/base/user/add", this.user).then((res) => {});
    },
    async authInputUser () {
        try {
            const response = await $api.post('/out/base/user/info')
            this.user.is_authorized = true;
            this.user.username = response.data.username;
            this.user.email = response.data.email;
            this.user.first_name = response.data.first_name;
            this.user.last_name = response.data.last_name;
            this.user.company_name = response.data.company_name;
            this.user.company_image = response.data.company_image;
            this.user.is_staff = response.data.is_staff;
            this.user.is_superuser = response.data.is_superuser;
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
