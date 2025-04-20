import {defineStore} from "pinia";
import UserApiService from "@/services/UserApiService";
import {isEmpty} from "lodash";
const $api = UserApiService.getAxiosInstance();
export const useUserStorage = defineStore("userStore", {
    state: ()=> ({
        //example schema
        practices: [
            {
                id: 114,
                doclinks: [],
                themes: [
                    {
                        "id": 7,
                        "title": "string"
                    },
                ],
                faculty_name: "Институт высоких технологий",
                faculty: 3
            },
        ],
        company: {
            id: 0,
            name: "string",
            agreement_date_begin: "string",
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
                const response = await $api.patch('/api/out/base/user/info', userInfo, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$patch({ user: response.data });
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
                const response = await $api.patch('/api/out/base/user/company',userCompany, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$patch({ company: response.data });
            } catch (error) {
                throw error;
            }
        },
        async fetchUserPractice() {
            try {
                const response = await $api.get('/api/out/base/user/practice');
                this.$patch({ practices: response.data });
                if (isEmpty(response.data)){
                    const defaultPractice = {
                        faculty: 38,
                        themes: []
                    }
                    await this.addUserPractice(defaultPractice);
                }
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
        async addUserTheme(theme) {
            try {

                const request = { title:theme.title, type:theme.type }
                const response = await $api.post('/api/out/base/user/themes', request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.themes.push(response.data);
                await this.addThemeToPractice(this.practices[0].id, response.data.id);
            } catch (error) {
                throw error;
            }
        },
        async deleteUserTheme(theme) {
            try {
                console.log(theme)
                await $api.delete(`/api/out/base/user/themes/${theme.id}`);
                this.themes = this.themes.filter(el => el.id !== theme.id)
            } catch (error) {
                throw error;
            }
        },
        async addUserPractice(practice) {
            try {
                const newPracticeId = (await $api.post('/api/out/base/user/practice', { faculty: practice.faculty }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                })).data.id;
                const addThemesToPractice = async (themeIds) => {
                    for (const themeId of themeIds) {
                        await $api.post(`/api/out/base/user/practice/${newPracticeId}/themes/${themeId}`);
                    }
                };
                await addThemesToPractice(practice.themes);
                await this.fetchUserPractice()
            } catch (error) {
                throw error;
            }
        },
        async addThemeToPractice(practiceId, themeId) {
            await $api.post(`/api/out/base/user/practice/${practiceId}/themes/${themeId}`);
        },
        async deleteUserPractice(practiceId) {
            try {
                await $api.delete(`/api/out/base/user/practice/${practiceId}`);
                this.practices = this.practices.filter(el => el.id !== practiceId);
            } catch (error) {
                throw error;
            }
        },
    },
});
