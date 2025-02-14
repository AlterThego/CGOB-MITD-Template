<script setup lang="ts">
import Groups from "./groups/index.vue";
import type { LocationGroup } from "~/types/models/gis";
import extent from "~/data/maps/extent";

import Map from "@/pages/utils/maps/index.vue";

const group = ref<LocationGroup>();
</script>

<template>
  <div class="flex flex-auto gap-4 overflow-auto">
    <Groups v-model="group" class="w-96 bg-gray-100 dark:bg-gray-800" />
    <div class="flex flex-auto flex-col gap-4 p-4">
      <div class="min-h-10">
        <TTypography variant="h1">
          {{ group?.name }}
        </TTypography>
      </div>
      <div class="flex-auto">
        <Map :extent></Map>
      </div>
    </div>
  </div>
</template>
