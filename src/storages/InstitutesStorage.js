import axios from "axios";
import {defineStore} from "pinia";

export const useInstitutesStorage = defineStore("InstitutesStorage", {
  state: () => ({
    institutes: [],
    isEmpty: true,
  }),
  actions: {
    async getInstitutesFromServer() {
      this.isEmpty = true
      await axios.get("/api/out/legacy/faculty")
          .then((response) => {
            this.institutes = response.data;
          });
      this.isEmpty = false;
    },
    getInstituteById(id){
      return this.institutes.find((institute) => institute.id === id);
    },
    async getInstitutesWithIds() {
      if (this.isEmpty){
        await this.getInstitutesFromServer();
      }
      return this.institutes.map((institute) => {
        return {
          id: institute.id,
          name: institute.name,
        };
      });
    }
  }
})
