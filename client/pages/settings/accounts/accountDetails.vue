<script setup lang="ts">
const state = reactive({
  email: undefined,
  password: undefined,
});

const isEdit = ref(false);
const showSaveRolePerms = ref(false);

onUnmounted(() => {
  isEdit.value = false;
  showSaveRolePerms.value = false;
});

const props = defineProps({
  openEdit: Boolean,
});

const toggleEdit = () => {
  isEdit.value = true;
};

watch([state], ([newState]) => {
  const hasChanges = newState.email !== "" || newState.password !== "";
  showSaveRolePerms.value = hasChanges;
});
</script>

<template>
  <div class="mb-5">
    <hr class="mb-3" />
    <TTypography
      variant="h5"
      class="relative mb-2 flex w-fit items-center text-base font-bold"
    >
      <span>Account Details</span>
      <TButton
        v-if="openEdit"
        size="xs"
        variant="solid"
        label="Save"
        :class="showSaveRolePerms ? 'opacity-100' : 'opacity-0'"
        class="absolute -right-14 ml-3"
      />
      <TButton
        v-if="openEdit"
        size="md"
        variant="ghost"
        color="gray"
        icon="tabler:pencil"
        @click="toggleEdit"
        class="absolute -right-9 ml-3"
        :class="!isEdit ? 'opacity-100' : 'opacity-0'"
      />
    </TTypography>
    <TForm :state="state" class="grid grid-cols-2 gap-5">
      <TFormGroup label="Email" name="email" class="flex-auto">
        <TInput
          v-model="state.email"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Email"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
      <TFormGroup label="Password" name="password" class="flex-auto">
        <TInput
          v-model="state.password"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Password"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
    </TForm>
  </div>
</template>
