import {defineStore} from 'pinia'
import axios from 'axios'

export const usePartnersStorage = defineStore('PartnersStorage',{
    state: () =>({
        partners: [],
        inst_id: 0,
        is_empty: false,
        has_error: false
    }),
    actions:{
        async getPartnersFromServer(){
            axios.get("/api/out/base/practice",{
                params: {
                    faculty: await this.getInstId()
                }
            })
            .then((response) => {
                const responseData = response.data
                this.partners= responseData
                this.is_empty = responseData.length === 0;
                this.has_error = false
            })
            .catch(err=>{
                this.practices = []
                this.has_error=true
            })
        },
        async setInstId(id){
            this.inst_id = id
            this.getPartnersFromServer();
        },
        getInstId(){
            return this.inst_id
        }


    }
})