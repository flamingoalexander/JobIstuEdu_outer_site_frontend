import {defineStore} from "pinia";
import axios from "axios";
import $api from "@/services/Api.js";



export const useUserStorage = defineStore("userStore", {
    state: ()=> ({
        //expected data schema
        userData: {
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
                id: 0,
                username: "pLHqY29ylG3HRCJbg",
                first_name: "string",
                last_name: "string",
                email: "user@example.com"
            },
        }
    }),
    actions: {
        async authInputUser() {
            try {
                const response = await $api.post('/api/out/base/user/info');
                this.$patch({ userData: response.data });
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
