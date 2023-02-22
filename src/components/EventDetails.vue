<script setup lang="ts">
import { formatDate } from "@/helpers";

const props = withDefaults(
  defineProps<{
    event: object;
    address: unknown;
  }>(),
  {}
);
</script>

<template>
  <tr v-for="(event, index) in props.event" :key="index">
    <td class="p-2 whitespace-nowrap">
      <div class="flex items-center">
        <div class="font-medium bg-gray-100 text-gray-700 py-3 px-3 rounded">
          {{ address }}
        </div>
      </div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="flex items-center">
        <div class="font-medium text-gray-800">{{ event["asset"] }}</div>
      </div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div
        class="text-lg text-center py-3 px-3 text-sm focus:outline-none leading-none rounded"
        :class="
          event['event_type'] === 'withdraw'
            ? 'text-red-700 bg-red-100'
            : 'text-green-700 bg-green-100'
        "
      >
        {{ event["event_type"] }}
      </div>
    </td>
    <td class="p-2 whitespace-nowrap text-gray-500">
      {{ formatDate(event["timestamp"]) }}
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left font-medium text-green-500">
        {{ event["value"]["amount"] }}
      </div>
    </td>
    <td class="p-2 whitespace-nowrap">
      <div class="text-left font-medium text-gray-700">
        {{ event["value"]["usd_value"] }}
      </div>
    </td>
  </tr>
</template>
