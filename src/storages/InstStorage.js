import axios from "axios";
import { defineStore } from "pinia";
export const useInstStorage = defineStore("instituteStore", {
  state: () => ({
    Institutes: [],
  }),
  actions: {
    async getInstitutesFromServer() {
      axios.get("/api/out/legacy/faculty")
      .then((response) => {
          this.Insts = response.data;
        });
    },
  }
})
