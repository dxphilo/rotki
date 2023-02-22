import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

import { baseUrl } from "@/env";
import { errorHandler } from "@/helpers/index";
import type { AccountBalances, AccountEvents } from "@/types/index";

export const useRootStore = defineStore("rootStore", () => {
  const userBalances = ref<Record<string, AccountBalances>>({});
  const userEvents = ref<Record<string, AccountEvents>>({});

  async function fetchBalances(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/balances`);
      const data = await response.data.result;
      userBalances.value = data;
    } catch (error: unknown) {
      // handle possible errors
      errorHandler(error);
    }
  }

  async function fetchEvents(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/events`, {
        responseType: "json",
      });
      const data = await response.data.result;
      userEvents.value = data;
    } catch (error: unknown) {
      // handle possible errors
      errorHandler(error);
    }
  }
  return { userBalances, userEvents, fetchEvents, fetchBalances };
});
