<script setup lang="ts">
import EventDetails from "@/components/EventDetails.vue";

import { useRootStore } from "@/stores";
import { computed, ref } from "vue";

const store = useRootStore();
const selectedAddress = ref<string>(``);

const userEvents = computed(() => {
  if (selectedAddress.value) {
    return {
      [selectedAddress.value]: store.$state.userEvents[selectedAddress.value],
    };
  }
  return store.$state.userEvents;
});
</script>

<template>
  <main class="py-8">
    <!-- component -->
    <section class="antialiased text-gray-600 py-4 px-4">
      <p class="text-xl text-center pb-6">User Account Events List</p>
      <div class="flex flex-col justify-center h-full">
        <!-- Table -->
        <div
          class="w-full lg:w-4/5 mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
        >
          <header
            class="px-5 py-4 border-b border-gray-100 flex justify-between"
          >
            <h2 class="font-semibold text-gray-800">
              Select specific user event to display
            </h2>
            <div>
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
                      <div class="font-semibold text-left">Account Address</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Asset</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Event type</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Timestamp</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-left">Amount</div>
                    </th>
                    <th class="p-3 whitespace-nowrap">
                      <div class="font-semibold text-center">Usd value</div>
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="(property, propertyName) in userEvents"
                  :key="propertyName"
                  class="text-sm divide-y divide-gray-100"
                >
                  <EventDetails
                    v-for="(event, symbol) in property"
                    :key="symbol"
                    :event="event"
                    :address="propertyName"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>