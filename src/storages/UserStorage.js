import {defineStore} from "pinia";
import axios from "axios";
import $api from "@/services/Api.js";

export const useUserStorage = defineStore("userStore", {
    state: ()=> ({
        user: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            company: {
                "id": null,
                "name": null,
                "themes": null,
                "dbegin": null,
                "dend": null,
                "agreements": null,
                "image": null,
                "area_of_activity": null
            },
            practices: [],
            is_staff: null,
            is_superuser: null
        }
    }),
    actions: {
        async authInputUser() {
            try {
                const response = await $api.post('/api/out/base/user/info')
                const UserData = response.data;
                this.user.is_authorized = true;
                this.user.username = UserData.user.username;
                this.user.email = UserData.user.email;
                this.user.first_name = UserData.user.first_name;
                this.user.last_name = UserData.user.last_name;
                this.user.company = UserData.company;
                this.user.practices = UserData.practices;
            } catch (error) {
                throw error;
            }
        },
        async UpdateUser(UserHolder) {
            try {
                const request = {
                    "user": {
                        "email": UserHolder.email,
                        "first_name": UserHolder.first_name,
                        "last_name": UserHolder.last_name,

                    },
                    "company": UserHolder.company,
                };
                await $api.patch('/api/out/base/user/info', request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await this.authInputUser();
            } catch (error) {
                throw error;
            }
        },
    },
});
