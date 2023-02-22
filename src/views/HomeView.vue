<script setup lang="ts">
import ListIcon from "@/components/icons/ListIcon.vue";

import { useRoute } from "vue-router";

const route = useRoute();
// methods
function getStyles(routename: string): string {
  let res = ``;
  if (route.name === routename) {
    res += ` text-gray-900 border-t-[2px] border-indigo-500`;
    return res;
  }
  return res;
}
</script>

<template>
  <div
    class="w-full lg:w-4/5 lg:mx-auto border-t border-gray-200 pt-20 text-sm lg:text-base text-gray-500"
  >
    <div class="flex">
      <router-link
        :to="'/'"
        class="block flex-1 text-center hover:text-gray-800 font-medium px-3 group"
      >
        <div
          class="flex items-center justify-center py-4"
          :class="getStyles('balances')"
        >
          <ListIcon class="mr-3" />
          <span> Asset List with (Amount, USD Value, and Percentage)</span>
        </div>
      </router-link>

      <router-link
        :to="'/events'"
        class="block flex-1 text-center hover:text-gray-800 font-medium px-3 group"
      >
        <div
          class="flex items-center justify-center py-4"
          :class="getStyles('events')"
        >
          <ListIcon class="mr-3" />
          <span>User Account Events List</span>
        </div>
      </router-link>
    </div>
  </div>
  <hr class="my-1 h-2" />

  <RouterView></RouterView>
</template>
