import {defineStore} from "pinia";
import UserApiService from "@/services/UserApiService";
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

                const request = { title:themeTitle }
                const response = await $api.post('/api/out/base/user/themes', request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.themes.push(response.data);
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
                const addPractice = async (facultyId) => {
                    return await $api.post('/api/out/base/user/practice', { faculty:facultyId }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                const newPracticeId = (await addPractice(practice.faculty)).data.id;
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
