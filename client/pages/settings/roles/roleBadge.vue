<script setup lang="ts">
import { TBadge } from "#components";
const { hexAToRGBA } = useColors();
const props = defineProps<{
  color: string;
}>();

const badge = ref<InstanceType<typeof TBadge> | null>(null);

const setColors = () => {
  const rgba = hexAToRGBA(props.color);
  const rgbVar = `${rgba.r} ${rgba.g} ${rgba.b}`;

  badge.value.$el.style.setProperty(
    "--tw-ring-color",
    `rgb(${rgbVar} / var(--tw-ring-opacity))`,
  );
  badge.value.$el.style.color = props.color;
  badge.value.$el.style.backgroundColor = `rgb(${rgbVar} / 0.1)`;
};

watch(() => props.color, setColors);

onMounted(() =>
  nextTick(() => {
    setColors();
  }),
);
</script>

<template>
  <TBadge ref="badge" class="brightness-75 dark:brightness-100"> </TBadge>
</template>
