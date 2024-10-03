import {defineStore} from 'pinia'
import axios from 'axios'

export const usePracticeStorage = defineStore('practiceStore',{
    state: () =>({
        practices:[],
        inst_id: 0,
        is_empty: false,
        has_error: false
    }),
    actions:{
        async getPracticeFromServer(){
            // console.log("получаем практики")
            axios.get("/api/out/base/practice",{
                params: {
                    faculty: await this.getInstId()
                }
            })
            .then((response) => {
                this.practices = response.data
                
                if (this.practices.length == 0) this.is_empty = true
                else this.is_empty = false
                this.has_error = false
                console.log(this.practices)
            })
            .catch(err=>{this.practices = [],this.has_error=true})
            
        },
        setInstId(id){
            this.inst_id = id
        },
        getInstId(){
            return this.inst_id
        }


    }
})