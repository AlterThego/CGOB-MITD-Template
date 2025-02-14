<script setup lang="ts"></script>
<template>
  <div class="mb-4 flex items-center gap-4">
    <TAvatar
      class="shadow-md"
      size="3xl"
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      alt="Avatar"
    />
    <div class="space-y-1.5">
      <div class="flex items-center gap-2">
        <TButton size="xs" variant="solid" label="Upload Photo" />
        <TButton color="gray" size="xs" label="Remove Photo" />
      </div>
      <TTypography variant="xs" class="font-medium">
        <!-- Edit text if needed -->
        Max file size is 2MB. PNG or JPG only.
      </TTypography>
    </div>
  </div>
</template>
