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
            argeement_date_begin: "string",
            agreement_date_end: "string",
            agreement: "string",
            image_url: "string",
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
        themes: [],
        doc_links: []
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
        async patchUserInfo(userInfo) {
            try {
                await $api.patch('/api/out/base/user/info',userInfo, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$patch({ user: userInfo });
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
        async patchUserCompany(userCompany) {
            try {
                await $api.patch('/api/out/base/user/company',userCompany, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$patch({ company: userCompany });
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
                    this.fetchUserPractice(),
                    this.fetchUserThemes()
                ]);
            } catch (error) {
                throw error;
            }
        },
        async fetchUserThemes() {
            try {
                const response = await $api.get('/api/out/base/user/themes');
                this.$patch({ themes: response.data });
            } catch (error) {
                throw error;
            }
        },
        async addUserTheme(themeTitle) {
            try {
                const request = JSON.stringify({
                    title: themeTitle
                });
                await $api.post('/api/out/base/user/info', request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        async UpdateUser() {
            try {
                const request = JSON.stringify(this.userData);
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
