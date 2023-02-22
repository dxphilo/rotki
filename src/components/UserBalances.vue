<script setup lang="ts">
import UserAsset from "@/components/UserAssets.vue";

import { useRootStore } from "@/stores";
import { computed, ref } from "vue";
import { sumOfAllUserBalancesinUsd } from "@/helpers";

const store = useRootStore();
const selectedAddress = ref<string>(``);
const userBalances = computed(() => {
  if (selectedAddress.value) {
    return {
      [selectedAddress.value]: store.$state.userBalances[selectedAddress.value],
    };
  }
  return store.$state.userBalances;
});
const totalSum = computed(() => {
  if (selectedAddress.value) {
    const useradress = {
      [selectedAddress.value]: store.$state.userBalances[selectedAddress.value],
    };
    return sumOfAllUserBalancesinUsd(useradress);
  }
  return sumOfAllUserBalancesinUsd(store.$state.userBalances);
});
</script>

<template>
  <main class="py-4 h-screen">
    <!-- component -->
    <section class="antialiased text-gray-600 py-3 px-4">
      <div class="flex flex-col justify-center h-full">
        <!-- Table -->
        <div
          class="w-full lg:w-4/5 mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
        >
          <header
            class="px-5 py-4 border-b border-gray-100 flex justify-between lg:flex-row flex-col"
          >
            <h2 class="font-semibold text-gray-800">
              Select specific account to display
            </h2>
            <div class="lg:py-0 py-3">
              <select
                v-model="selectedAddress"
                class="bg-gray-200 py-1 rounded px-1 text-black"
              >
                <option value="">All Addresses</option>
                <option
                  v-for="(address, index) in store.$state.userBalances"
                  :key="index"
                  :value="index"
                >
                  {{ index }}
                </option>
              </select>
            </div>
          </header>
          <div class="p-3 pt-0">
            <div class="overflow-x-auto">
              <table class="table-auto w-full">
                <thead
                  class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
                >
                  <tr class="border-top-0">
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Asset</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Amount</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">USD value</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-center">Percentage</div>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="text-sm divide-y divide-gray-100"
                  v-for="(user, address) in userBalances"
                  :key="address"
                >
                  <UserAsset
                    v-for="(token, symbol) in user"
                    :key="symbol"
                    :token="token"
                    :symbol="symbol"
                    :totalsum="totalSum"
                  />
                </tbody>
                <tbody>
                  <tr class="font-semibold text-gray-800">
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="">Total of user's Assets in (USD)</div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left"></div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div>
                        {{
                          Number(
                            sumOfAllUserBalancesinUsd(userBalances)
                          ).toLocaleString()
                        }}
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-lg text-center">100%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
