<script setup lang="ts">
import type { token } from "@/types";
import { percentageOfUserAsset } from "@/helpers";
const props = withDefaults(
  defineProps<{
    symbol: string | number;
    token: token;
    totalsum: number;
  }>(),
  {}
);

const percentageScore = percentageOfUserAsset(
  props.token.usd_value,
  props.totalsum
);
</script>

<template>
  <tr>
    <td class="p-2 whitespace-nowrap">
      <div class="flex items-center">
        <div class="font-medium text-gray-800">{{ props.symbol }}</div>
      </div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left">{{ props.token.amount }}</div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left font-medium text-green-500">
        {{ Number(props.token.usd_value).toLocaleString() }}
      </div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div
        class="text-lg text-center py-3 px-3 text-sm focus:outline-none leading-none rounded"
        :class="
          percentageScore <= 9
            ? `text-red-700 bg-red-100`
            : percentageScore >= 50
            ? `text-green-700 bg-green-100`
            : `text-indigo-700 bg-indigo-100`
        "
      >
        {{ Number(percentageScore).toLocaleString() }} %
      </div>
    </td>
  </tr>
</template>
