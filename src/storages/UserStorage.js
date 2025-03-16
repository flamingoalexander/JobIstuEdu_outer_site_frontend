import {defineStore} from "pinia";
import axios from "axios";
import $api from "@/services/Api.js";



export const useUserStorage = defineStore("userStore", {
    state: ()=> ({
        practices: [
            {
                id: 0,
                doc_links: [
                    {
                        id: 0,
                        type: "string",
                        url: "string"
                    }
                ],
                themes: [
                    {
                        id: 0,
                        name: "string"
                    }
                ],
                name: "string",
                faculty: 0
            }
        ],
        company: {
            id: 0,
            name: "string",
            themes: "string",
            dbegin: "string",
            dend: "string",
            agreements: "string",
            image: "string",
            area_of_activity: "string",
            head_full_name: "string",
            head_job_title: "string"
        },
        user: {
            username: "pLHqY29ylG3HRCJbg",
            first_name: "string",
            last_name: "string",
            email: "user@example.com"
        },
    }),
    actions: {
        async fetchUserInfo() {
            try {
                const response = await $api.get('/api/out/base/user/info');
                this.$patch({ user: response.data });
            } catch (error) {
                throw error;
            }
        },
        async patchUserInfo() {
            try {
                const request = JSON.stringify(this.user);
                await $api.patch('/api/out/base/user/info', request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        async fetchUserCompany() {
            try {
                const response = await $api.get('/api/out/base/user/company');
                this.$patch({ company: response.data });
            } catch (error) {
                throw error;
            }
        },
        async fetchUserPractice() {
            try {
                const response = await $api.get('/api/out/base/user/practice');
                this.$patch({ practice: response.data });
            } catch (error) {
                throw error;
            }
        },
        async fetchUserData() {
            try {
                await Promise.all([
                    this.fetchUserInfo(),
                    this.fetchUserCompany(),
                    this.fetchUserPractice()
                ]);
            } catch (error) {
                throw error;
            }
        },
        async UpdateUser() {
            try {
                const request = JSON.stringify(this.userData);
                console.log(123);
                console.log(request);
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
