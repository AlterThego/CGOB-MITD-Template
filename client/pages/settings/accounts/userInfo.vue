<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import DatePicker from "~/components/DatePicker.vue";
const $dayjs = useDayjs();

const selectedGender = ref([]);
const selectedDate = ref($dayjs().format("YYYY-MM-DD"));

const state = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  username: undefined,
  password: undefined,
  desc: undefined,
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

watch(
  [state, selectedDate, selectedGender],
  ([newState, newSelectedDate, newSelectedGender]) => {
    const hasChanges =
      newState.firstname !== "" ||
      newState.lastname !== "" ||
      newState.username !== "" ||
      newSelectedDate !== $dayjs().format("YYYY-MM-DD") ||
      newSelectedGender.length > 0;

    showSaveRolePerms.value = hasChanges;
  },
  { deep: true },
);
</script>

<template>
  <div class="mb-5">
    <hr class="mb-2" />
    <TTypography
      variant="h5"
      class="relative mb-2 flex w-fit items-center text-base font-bold"
    >
      <span>User Information</span>
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
      <TFormGroup label="Firstname" name="firstname" class="flex-auto">
        <TInput
          v-model="state.firstname"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Firstname"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
      <TFormGroup label="Lastname" name="lastname" class="flex-auto">
        <TInput
          v-model="state.lastname"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Lastname"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
      <TFormGroup label="Middle name" name="middleName" class="flex-auto">
        <TInput
          v-model="state.email"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Middle name"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
      <TFormGroup label="Username" name="username" class="flex-auto">
        <TInput
          v-model="state.username"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Username"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
      <TFormGroup label="Birthddate" name="birthdate" class="flex-auto">
        <TPopover :popper="{ placement: 'bottom-start' }">
          <TButton
            :disabled="!isEdit && openEdit"
            icon="tabler:calendar"
            class="w-full"
            color="gray"
            :label="$dayjs(selectedDate).format('D MMM, YYYY')"
          />

          <template #panel="{ close }">
            <DatePicker v-model="selectedDate" is-required @close="close" />
          </template>
        </TPopover>
      </TFormGroup>
      <TFormGroup label="Gender" name="gender" class="flex-auto">
        <TSelectMenu
          v-slot="{ open }"
          :disabled="!isEdit && openEdit"
          class="min-w-32"
          v-model="selectedGender"
          :options="['Male', 'Female', 'Others']"
          :ui="{ background: '!bg-transparent' }"
        >
          <TButton color="gray" class="flex-1 justify-between text-gray-400">
            <span
              v-if="selectedGender.length !== 0"
              class="max-w-40 truncate"
              >{{ selectedGender }}</span
            >
            <span v-else>Select Gender</span>
            <TIcon
              name="i-heroicons-chevron-right-20-solid"
              class="h-5 w-5 transition-transform dark:text-gray-500"
              :class="[open && 'rotate-90 transform']"
            />
          </TButton>
        </TSelectMenu>
      </TFormGroup>
    </TForm>
  </div>
</template>
