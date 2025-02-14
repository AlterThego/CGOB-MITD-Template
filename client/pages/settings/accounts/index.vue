<script setup lang="ts">
import { accountsUserCard } from "~/data/accountsDummy";
import UserAvatar from "./userAvatar.vue";
import UserInformation from "./userInfo.vue";
import AccountDetails from "./accountDetails.vue";
import RolesPermissions from "./role_permissions.vue";
import Address from "./address.vue";

const { stringToColour } = useColors();
const userCard = ref(accountsUserCard);
const isOpen = ref(false);
const isLoading = ref(false);
const selectedFilter = ref([]);
const openEdit = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isOpen.value = false;
    isLoading.value = false;
  }, 1500);
};

const handleCancel = () => {
  isOpen.value = false;
  openEdit.value = false;
};
</script>
<template>
  <div>
    <div class="w-full space-y-4 px-6 pb-4 pt-6">
      <div
        class="sticky top-0 col-span-full row-span-1 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <TInput
            icon="tabler:search"
            size="sm"
            color="white"
            trailing
            placeholder="Search..."
          />
        </div>
        <div class="flex items-center gap-3">
          <TSelectMenu
            v-slot="{ open }"
            searchable-placeholder="Search a Role..."
            class="min-w-32"
            v-model="selectedFilter"
            :options="['Active', 'Inactive', 'Clear']"
            :ui="{ background: '!bg-transparent' }"
          >
            <TButton color="gray" class="flex-1 justify-between text-gray-400">
              <span
                v-if="selectedFilter.length !== 0"
                class="max-w-40 truncate"
                >{{ selectedFilter }}</span
              >
              <span v-else>Select Status</span>
              <TIcon
                name="i-heroicons-chevron-right-20-solid"
                class="h-5 w-5 transition-transform dark:text-gray-500"
                :class="[open && 'rotate-90 transform']"
              />
            </TButton>
          </TSelectMenu>
          <TSelectMenu
            v-slot="{ open }"
            multiple
            searchable-placeholder="Search a Role..."
            class="min-w-32"
            v-model="selectedFilter"
            :options="rolesList"
            :ui="{ background: '!bg-transparent' }"
          >
            <TButton color="gray" class="flex-1 justify-between text-gray-400">
              <span>Select Role Filter</span>
              <TIcon
                name="i-heroicons-chevron-right-20-solid"
                class="h-5 w-5 transition-transform dark:text-gray-500"
                :class="[open && 'rotate-90 transform']"
              />
            </TButton>
          </TSelectMenu>
          <TButton icon="tabler:plus" label="Open" @click="isOpen = true"
            >Add New Admin</TButton
          >
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4">
        <TCard
          v-for="data in userCard"
          :key="data.id"
          class="relative overflow-hidden"
        >
          <div
            class="absolute inset-x-0 top-0 h-16 opacity-70"
            :style="{ backgroundColor: stringToColour(`${data.firstname} ${data.lastname}`) }"
          ></div>
          <div class="flex h-full flex-col items-center gap-4 px-4 pb-4 pt-6">
            <div class="flex flex-col items-center gap-4">
              <TAvatar
                class="shadow-md"
                size="3xl"
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
              />
              <TTypography class="text-base">{{
                `${data.firstname} ${data.lastname}`
              }}</TTypography>
              <!-- Badge Color should change base on color -->
              <div class="text flex flex-wrap justify-center gap-1">
                <TBadge
                  v-for="role in data.roles"
                  :key="role.name"
                  :label="role.name"
                  :style="{
                    backgroundColor: `rgba(${role.color}, 0.1)`,
                    '--tw-ring-color': `rgba(${role.color})`,
                    color: `rgba(${role.color})`,
                  }"
                  size="sm"
                  variant="subtle"
                  :ui="{ rounded: 'rounded-full' }"
                />
              </div>
            </div>
            <div class="flex-auto content-end space-x-3 pt-3">
              <TButton
                icon="tabler:eye"
                color="gray"
                size="sm"
                variant="solid"
                label="View"
              />
              <TButton
                icon="tabler:pencil"
                color="gray"
                size="sm"
                variant="solid"
                label="Edit"
                @click="
                  isOpen = true;
                  openEdit = true;
                "
              />
              <TButton
                icon="tabler:lock"
                color="gray"
                size="sm"
                variant="solid"
                label="Deactivate"
              />
            </div>
          </div>
        </TCard>
      </div>
    </div>
    <!-- Modal -->
    <TModal
      v-model="isOpen"
      :prevent-close="isLoading"
      :ui="{ base: 'sm:!max-w-5xl' }"
    >
      <TCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex w-full items-center justify-between px-8 py-2">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ openEdit ? "Edit User" : "Add New Admin" }}
            </h3>
            <TButton
              color="gray"
              variant="ghost"
              icon="tabler:x"
              class="-my-1"
              @click="handleCancel()"
            />
          </div>
        </template>
        <div class="space-y-4 px-8 py-4">
          <TForm :state="state">
            <div class="grid grid-cols-7 gap-10">
              <div class="col-span-4">
                <UserAvatar />
                <UserInformation :openEdit="openEdit" />
                <AccountDetails :openEdit="openEdit" />
                <Address :openEdit="openEdit" />
              </div>
              <div class="col-span-3">
                <RolesPermissions :openEdit="openEdit" />
              </div>
            </div>
          </TForm>
          <div class="flex items-center justify-end gap-3 pt-4">
            <TButton
              v-if="!openEdit"
              @click="
                handleSubmit;
                openEdit = false;
              "
              :loading="isLoading"
              >Submit</TButton
            >
            <TButton variant="outline" @click="handleCancel()">Cancel</TButton>
          </div>
        </div>
      </TCard>
    </TModal>
  </div>
</template>
