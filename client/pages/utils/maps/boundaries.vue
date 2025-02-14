<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string;
  }>(),
  {
    name: undefined,
    loading: false,
  },
);

const loading = defineModel<boolean>("loading");

const format = inject("ol-format");

const { $api } = useNuxtApp();

const geojson = new format.GeoJSON();
const file = ref<string>();

const loadBoundaries = () => {
  loading.value = true;
  file.value = undefined;
  if (!props.name) return;
  $api
    .get(`/maps/geojson/${props.name}`)
    .then((response) => {
      file.value = `data:,${encodeURIComponent(JSON.stringify(response.data))}`;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(() => props.name, loadBoundaries);

onMounted(() => {
  loadBoundaries();
});
</script>

<template>
  <ol-vector-layer v-if="!!file">
    <ol-source-vector :format="geojson" :url="file" projection="EPSG:4326" />
    <ol-style>
      <ol-style-stroke color="white" :width="1"></ol-style-stroke>
      <ol-style-fill color="rgba(128,128,255,0.35)"></ol-style-fill>
    </ol-style>
  </ol-vector-layer>
</template>
