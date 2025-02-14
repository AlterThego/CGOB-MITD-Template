<script setup lang="ts">
import type Map from "ol/Map";
import Projections from "~/data/maps/projections";

const props = defineProps<{
  extent?: Array<number>;
}>();

const mapRef = ref<{ map: Map }>();
const center = ref([120.5916097805851, 16.399151412602567]);
const zoom = ref(12);

const getCurrentExtent = () => {
  return mapRef
    .value!.map.getView()
    .calculateExtent(mapRef.value!.map.getSize());
};
</script>
<template>
  <ol-map ref="mapRef" class="h-full" :controls="[]">
    <ol-projection-register
      v-for="projecttion in Projections"
      :key="projecttion.name"
      :projectionName="projecttion.name"
      :projectionDef="projecttion.def"
      :projectionExtent="projecttion.extent"
    />

    <ol-view ref="view" :center :zoom :extent projection="EPSG:4326" />

    <slot name="source">
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </slot>

    <slot></slot>
  </ol-map>
</template>
