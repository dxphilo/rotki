import { defineStore } from "pinia";
import axios from "axios";

import { baseUrl } from "@/env";
import { errorHandler } from "@/helpers/index";
import type { rootStore } from "@/types/index";

export const useRootStore = defineStore("rootStore", {
  state: (): rootStore => {
    return {
      userBalances: {},
      userEvents: {},
    };
  },
  actions: {
    async fetchBalances(): Promise<void> {
      try {
        const response = await axios.get(`${baseUrl}/balances`);
        const data = await response.data.result;
        this.userBalances = data;
      } catch (error: unknown) {
        // handle various possible errors
        errorHandler(error);
      }
    },
    async fetchEvents(): Promise<void> {
      try {
        const response = await axios.get(`${baseUrl}/events`, {
          responseType: "json",
        });
        const data = await response.data.result;
        console.log(data);
        this.userEvents = data;
      } catch (error: unknown) {
        // handle various possible errors
        errorHandler(error);
      }
    },
  },
  getters: {},
});
