import axios from "axios";
import { defineStore } from "pinia";
export const useInstitutesStorage = defineStore("InstitutesStorage", {
  state: () => ({
    institutes: [],
  }),
  actions: {
    async getInstitutesFromServer() {
      axios.get("/api/out/legacy/faculty")
          .then((response) => {
            this.institutes = response.data;
          });
    },
    getInstituteById(id){
      this.institutes.forEach((institute) => {
        if (institute.id === id) {
          return institute;
        }
        return false
      })
    }
  }
})
