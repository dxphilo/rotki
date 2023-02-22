<script setup lang="ts">
import Header from "@/components/HeroHeader.vue";

import { onBeforeMount } from "vue";
import { useRootStore } from "@/stores";

const store = useRootStore();

onBeforeMount(async () => {
  store.fetchBalances();
  store.fetchEvents();
});
</script>

<template>
  <div class="bg-gray-100">
    <Header />
    <RouterView />
  </div>
</template>
