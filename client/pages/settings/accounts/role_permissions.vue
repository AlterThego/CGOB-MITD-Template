<script setup lang="ts">
import { permissionsDummy } from "~/data/permissionsDummy";

const toast = useToast();
const permissions = ref(permissionsDummy);
const selectAll = ref(false);
const selectedRole = ref([]);

const rolesList = [
  "Administrator",
  "Moderator",
  "Users",
  "Restricted User",
  "User Manager",
  "Roles 8",
  "Roles 9",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

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

watch(selectedRole, (newValue) => {
  if (newValue.length > 0) {
    showSaveRolePerms.value = true;
  }
});

const checkbox = ref(
  permissions.value.reduce(
    (acc: Record<number, boolean>, permission: { id: number }) => {
      acc[permission.id] = false;
      return acc;
    },
    {} as Record<number, boolean>,
  ),
);

console.log(showSaveRolePerms.value);

const toggleSelectAll = () => {
  Object.keys(checkbox.value).forEach((key) => {
    checkbox.value[key] = selectAll.value;
  });
};

const checkIfAllSelected = () => {
  selectAll.value = Object.values(checkbox.value).every(
    (isSelected) => isSelected,
  );
};

watch(checkbox, checkIfAllSelected, { deep: true });

const searchTerm = ref("");
const debouncedSearchTerm = ref("");
let debounceTimeout;

watch(searchTerm, (newTerm) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    debouncedSearchTerm.value = newTerm;
  }, 300);
});

const filteredPermissions = computed(() => {
  if (!debouncedSearchTerm.value) return permissions.value;

  return permissions.value.filter((permission) =>
    permission.name
      .toLowerCase()
      .includes(debouncedSearchTerm.value.toLowerCase()),
  );
});
</script>
<template>
  <div>
    <TTypography
      variant="h5"
      class="relative mb-2 flex w-fit items-center text-base font-bold"
    >
      <span>Roles and Permissions</span>
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
    <TFormGroup label="Select Role" name="role " class="flex-auto">
      <TSelectMenu
        v-slot="{ open }"
        searchable
        multiple
        :disabled="!isEdit && openEdit"
        searchable-placeholder="Search a Role..."
        class="w-full"
        v-model="selectedRole"
        :options="rolesList"
        :ui="{ background: '!bg-transparent' }"
      >
        <TButton color="gray" class="flex-1 justify-between text-gray-400">
          <span v-if="selectedRole.length" class="max-w-80 truncate">{{
            selectedRole.join(", ")
          }}</span>
          <span v-else>Select Role</span>
          <TIcon
            name="i-heroicons-chevron-right-20-solid"
            class="h-5 w-5 transition-transform dark:text-gray-500"
            :class="[open && 'rotate-90 transform']"
          />
        </TButton>
      </TSelectMenu>
    </TFormGroup>
    <!-- Permission List -->
    <div class="space-y-3">
      <TFormGroup
        label="Permissions"
        name="selectAll"
        class="flex items-center justify-between pb-2 pt-6"
        size="xl"
      >
        <TCheckbox
          label="Select All"
          v-model="selectAll"
          :disabled="!isEdit && openEdit"
          @change="toggleSelectAll"
          :ui="{ base: 'h-5 w-5', border: 'border-2' }"
        />
      </TFormGroup>
      <TInput
        v-model="searchTerm"
        :disabled="!isEdit && openEdit"
        icon="tabler:search"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search Permission..."
        :ui="{ base: 'max-w-full' }"
      />
      <div
        class="max-h-[540px] min-h-[400px] overflow-y-scroll overscroll-contain pr-3 scrollbar-thin"
      >
        <!-- Check if filteredPermissions has results -->
        <template v-if="filteredPermissions.length > 0">
          <TFormGroup
            v-for="(permission, index) in filteredPermissions"
            :key="index"
            :label="permission.name"
            :description="permission.description"
            :name="permission.name"
            class="flex items-center justify-between border-b border-gray-200 py-4 dark:border-gray-700"
          >
            <TCheckbox
              v-model="checkbox[permission.id]"
              :disabled="!isEdit && openEdit"
              @change="checkIfAllSelected"
              :ui="{ base: 'h-5 w-5', border: 'border-2' }"
            />
          </TFormGroup>
        </template>

        <!-- Display message if no permissions found -->
        <template v-else>
          <div class="py-4 text-center text-gray-500">
            No such permission found.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
