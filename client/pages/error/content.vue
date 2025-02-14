<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};

const props = defineProps<{
  statusCode?: string;
  icon?: string;
  title: string;
  message: string;
}>();
</script>

<template>
  <div class="-mt-64 flex flex-col items-center space-y-5">
    <div class="flex flex-col items-center gap-3">
      <TTypography variant="h1" class="text-8xl font-semibold">
        <TIcon v-if="icon" :name="icon" class="text-coral-500" />
        {{ statusCode }}
      </TTypography>
      <TTypography variant="xl" class="font-medium">{{ title }}</TTypography>
      <TTypography variant="md" class="max-w-lg text-center">
        {{ message }}
      </TTypography>
    </div>
    <TButton @click="goBack">Go back</TButton>
  </div>
</template>
