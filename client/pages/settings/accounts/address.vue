<script setup lang="ts">
const selectedRegion = ref([]);
const selectedProvince = ref([]);
const selectedCity = ref([]);
const selectedBarangay = ref([]);
const state = reactive({
  address: undefined,
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
  [state, selectedRegion, selectedProvince, selectedCity, selectedBarangay],
  ([
    newState,
    newSelectedRegion,
    newSelectedProvince,
    newSelectedCity,
    newSelectedBarangay,
  ]) => {
    const hasChanges =
      newState.address !== "" ||
      newSelectedRegion.length > 0 ||
      newSelectedProvince.length > 0 ||
      newSelectedCity.length > 0 ||
      newSelectedBarangay.length > 0;

    showSaveRolePerms.value = hasChanges;
  },
);
</script>

<template>
  <div>
    <hr class="mb-3" />

    <TTypography
      variant="h5"
      class="relative mb-2 flex w-fit items-center text-base font-bold"
    >
      <span>Address Information</span>
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
      <TFormGroup label="Region" name="region" class="flex-auto">
        <TSelectMenu
          v-slot="{ open }"
          :disabled="!isEdit && openEdit"
          searchable
          searchable-placeholder="Search Region..."
          class="min-w-32"
          v-model="selectedRegion"
          :options="['Male', 'Female', 'Others']"
          :ui="{ background: '!bg-transparent' }"
        >
          <TButton color="gray" class="flex-1 justify-between text-gray-400">
            <span
              v-if="selectedRegion.length !== 0"
              class="max-w-40 truncate"
              >{{ selectedRegion }}</span
            >
            <span v-else>Select Region</span>
            <TIcon
              name="i-heroicons-chevron-right-20-solid"
              class="h-5 w-5 transition-transform dark:text-gray-500"
              :class="[open && 'rotate-90 transform']"
            />
          </TButton>
        </TSelectMenu>
      </TFormGroup>
      <TFormGroup label="Province" name="province" class="flex-auto">
        <TSelectMenu
          v-slot="{ open }"
          :disabled="!isEdit && openEdit"
          searchable
          searchable-placeholder="Search Province..."
          class="min-w-32"
          v-model="selectedProvince"
          :options="['Male', 'Female', 'Others']"
          :ui="{ background: '!bg-transparent' }"
        >
          <TButton color="gray" class="flex-1 justify-between text-gray-400">
            <span
              v-if="selectedProvince.length !== 0"
              class="max-w-40 truncate"
              >{{ selectedProvince }}</span
            >
            <span v-else>Select Province</span>
            <TIcon
              name="i-heroicons-chevron-right-20-solid"
              class="h-5 w-5 transition-transform dark:text-gray-500"
              :class="[open && 'rotate-90 transform']"
            />
          </TButton>
        </TSelectMenu>
      </TFormGroup>
      <TFormGroup label="City" name="city" class="flex-auto">
        <TSelectMenu
          v-slot="{ open }"
          :disabled="!isEdit && openEdit"
          searchable
          searchable-placeholder="Search City..."
          class="min-w-32"
          v-model="selectedCity"
          :options="['Male', 'Female', 'Others']"
          :ui="{ background: '!bg-transparent' }"
        >
          <TButton color="gray" class="flex-1 justify-between text-gray-400">
            <span v-if="selectedCity.length !== 0" class="max-w-40 truncate">{{
              selectedCity
            }}</span>
            <span v-else>Select City</span>
            <TIcon
              name="i-heroicons-chevron-right-20-solid"
              class="h-5 w-5 transition-transform dark:text-gray-500"
              :class="[open && 'rotate-90 transform']"
            />
          </TButton>
        </TSelectMenu>
      </TFormGroup>
      <TFormGroup label="Barangay" name="barangay" class="flex-auto">
        <TSelectMenu
          v-slot="{ open }"
          :disabled="!isEdit && openEdit"
          searchable
          searchable-placeholder="Search Barangay..."
          class="min-w-32"
          v-model="selectedBarangay"
          :options="['Male', 'Female', 'Others']"
          :ui="{ background: '!bg-transparent' }"
        >
          <TButton color="gray" class="flex-1 justify-between text-gray-400">
            <span
              v-if="selectedBarangay.length !== 0"
              class="max-w-40 truncate"
              >{{ selectedBarangay }}</span
            >
            <span v-else>Select Barangay</span>
            <TIcon
              name="i-heroicons-chevron-right-20-solid"
              class="h-5 w-5 transition-transform dark:text-gray-500"
              :class="[open && 'rotate-90 transform']"
            />
          </TButton>
        </TSelectMenu>
      </TFormGroup>
      <TFormGroup label="Address" name="address" class="col-span-full">
        <TInput
          v-model="state.address"
          :disabled="!isEdit && openEdit"
          placeholder="Enter Address"
          :ui="{
            base: 'max-w-full',
          }"
        />
      </TFormGroup>
    </TForm>
  </div>
</template>
