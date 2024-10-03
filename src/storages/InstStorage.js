import axios from "axios";
import { defineStore } from "pinia";
export const useInstStorage = defineStore("instituteStore", {
  state: () => ({
    Insts: [],
    current_institute: null

  }),

  actions: {
    async getInstsFromServer() {
      // console.log("получаем институты")
      axios.get("/api/out/legacy/faculty")
      .then((response) => {
          this.Insts = response.data;
        });
    },
    
    getInstsById(id) {
      // console.log("получаем институты")
     this.current_institute = this.Insts.filter((el)=>el.id == id)[0]
    },
  }
})
