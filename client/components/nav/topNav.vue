<script setup lang="ts">
import type { AvatarOptions } from "~/types";

const props = withDefaults(
  defineProps<{
    fixed?: boolean;
    colorToggle?: boolean;
    themeToggle?: boolean;
    screenToggle?: boolean;
    avatarOptions?: Array<AvatarOptions>;
    pwaInstall?: boolean;
  }>(),
  {
    fixed: false,
    colorToggle: true,
    themeToggle: true,
    screenToggle: true,
    pwaInstall: true,
  },
);
const emit = defineEmits(["toggleSidebar"]);
const $system = useSystemStore();
</script>

<template>
  <nav
    class="layout-border--b z-30 flex items-center justify-between gap-1.5 bg-gray-50 px-6 py-3 dark:bg-gray-700"
    :class="{ 'sticky top-0': fixed }"
  >
    <div class="">
      <TButton
        color="gray"
        variant="ghost"
        size="md"
        square
        icon="tabler:menu-2"
        :ui="{ rounded: 'rounded-full', icon: { size: { md: 'h-6 w-6' } } }"
        @click="$system.sidebar.collapsed = !$system.sidebar.collapsed"
      />
    </div>
    <div class="flex flex-auto items-center gap-1.5">
      <slot></slot>
    </div>

    <div class="flex items-center gap-1.5">
      <PwaInstall v-if="pwaInstall" />
      <ColorScheme v-if="colorToggle" />
      <ScreenToggle v-if="screenToggle" />
      <Theme v-if="themeToggle" />
      <Avatar :menus="avatarOptions" />
    </div>
  </nav>
</template>
