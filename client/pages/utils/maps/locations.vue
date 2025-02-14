<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    title?: string;
    color?: string;
    icon?: string;
    radius?: number;
  }>(),
  {
    color: "red",
    radius: 7,
  },
);
const emit = defineEmits(["update:loading"]);

const loading = defineModel("loading", {
  type: Boolean,
  default: false,
});

const format = inject("ol-format");
const geojson = new format.GeoJSON();

const { $api } = useNuxtApp();

const file = ref<string>();

const loadPoints = () => {
  loading.value = true;
  file.value = undefined;
  $api
    .get(`/maps/geojson/${props.name}`)
    .then((response) => {
      file.value = `data:,${encodeURIComponent(JSON.stringify(response.data))}`;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => loadPoints());
</script>

<template>
  <ol-vector-layer v-if="!!file" :title>
    <ol-source-vector :format="geojson" :url="file" projection="EPSG:3213" />
    <ol-style>
      <ol-style-stroke color="black" :width="2"></ol-style-stroke>
      <ol-style-fill color="rgba(77,77,255,0.25)"></ol-style-fill>
      <ol-style-icon v-if="icon" :src="icon" :scale="0.9"></ol-style-icon>
    </ol-style>
  </ol-vector-layer>
</template>
