import axios from "axios";
import { defineStore } from "pinia";
export const useCompanyStorage = defineStore("companyStore", {
  state: () => ({
    companies: [],
  }),

  actions: {
    async getCompaniesFromServer() {
      // console.log("получаем институты")
      axios.get("/api/out/legacy/company")
      .then((response) => {
          this.companies = response.data;
          console.log(this.companies.filter((el)=>el.id == 30)[0])
        });
    },
  }
})
