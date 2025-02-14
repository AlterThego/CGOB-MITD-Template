<script setup lang="ts">
import type { PermissionItem } from "~/types/models/permission";

const { dashToHuman } = useUtils();

const props = defineProps<{
  searchApi: string;
  viewSelected?: boolean;
}>();

const { pagination, searcher } = useSearcher({
  api: props.searchApi,
  limit: 10,
  appendToUrl: false,
  onPageChange: () => loadPermissions(),
});

const model = defineModel({
  type: Array as PropType<Array<PermissionItem>>,
  default: () => [],
});
const loading = defineModel("loading", {
  default: false,
  type: Boolean,
});
const loadingMessage = defineModel("loadingMessage", {
  default: "",
  type: String,
});
const error = defineModel("error", {
  default: null,
  type: String,
});

const permissions = ref<Array<PermissionItem>>([]);
const search = ref("");
const isNone = ref(false);
const showSearch = ref(false);

const loadPermissions = () => {
  loading.value = true;
  loadingMessage.value = "Loading permissions...";

  searcher({ search: search.value })
    .then((res) => {
      permissions.value = res.data.data as Array<PermissionItem>;
      isNone.value = modelHasNone();
    })
    .finally(() => {
      loading.value = false;
    });
};

const modelHasNone = (): boolean => {
  return model.value.length <= 0;
};

const onNone = (e: boolean) => {
  model.value = [];
  isNone.value = true;
};

const isSelected = (permission: PermissionItem) => {
  return !!model.value.find((p) => p.id === permission.id);
};

const onCheck = (permission: PermissionItem) => {
  if (isSelected(permission)) {
    model.value = model.value.filter((p) => p.id !== permission.id);
  } else {
    model.value.push(permission);
  }
};

watch(
  model,
  () => {
    isNone.value = modelHasNone();
  },
  { deep: true },
);

onMounted(() => {
  loadPermissions();
});
</script>

<template>
  <div class="flex flex-col gap-4 px-4">
    <div class="flex items-center justify-between gap-2">
      <TTypography
        variant="md"
        class="font-semibold text-gray-700 dark:text-gray-200"
      >
        Permissions {{ `(${model.length ?? 0})` }}
      </TTypography>
      <div class="flex items-center gap-2">
        <TPopover v-if="viewSelected">
          <TButton icon="tabler:list" size="sm" variant="ghost" color="gray" />
          <template #panel="{ close }">
            <div
              class="flex max-h-64 min-h-64 w-screen-95 max-w-sm flex-col gap-2 px-3 py-2"
            >
              <div
                class="flex items-center justify-between border-b border-gray-400/25 font-semibold"
              >
                Selected Permissions
                <TButton
                  icon="tabler:x"
                  variant="ghost"
                  color="gray"
                  @click="close"
                  :padded="false"
                  :ui="{ rounded: 'rounded-full' }"
                />
              </div>
              <div
                class="flex flex-auto flex-col gap-2 overflow-auto overscroll-contain scrollbar-thin"
              >
                <template
                  v-for="selected in model"
                  :key="`selected_${selected.id}`"
                >
                  <div class="jsutify-between flex items-center gap-2">
                    <span class="line-clamp-1 flex-auto text-sm">
                      {{ dashToHuman(selected.name) }}
                    </span>
                    <TButton
                      icon="tabler:x"
                      variant="ghost"
                      color="sunset"
                      :padded="false"
                      @click="onCheck(selected)"
                    />
                  </div>
                </template>
                <div
                  v-if="!model.length"
                  class="flex h-full flex-auto flex-col items-center justify-center gap-2 text-gray-400"
                >
                  <TIcon
                    name="tabler:database"
                    class="h-6 w-6 text-gray-400 dark:text-gray-500"
                  />
                  <TTypography
                    variant="sm"
                    class="text-center text-gray-900 dark:text-white"
                  >
                    No permission selected
                  </TTypography>
                </div>
              </div>
            </div>
          </template>
        </TPopover>
        <TButton
          icon="tabler:search"
          size="sm"
          variant="ghost"
          color="gray"
          :disabled="loading"
          :class="{
            'text-primary-400 dark:text-primary-400': showSearch,
          }"
          @click="showSearch = !showSearch"
        />
        <label for="none_chk" class="flex select-none items-center gap-2">
          <TCheckbox
            id="none_chk"
            v-model="isNone"
            :disabled="loading"
            :ui="{
              base: 'h-5 w-5',
              border: 'border-2',
              ring: 'focus-visible:ring-0 dark:focus-visible:ring-0',
            }"
            @change="onNone"
          />
          <span>None</span>
        </label>
      </div>
    </div>
    <TCollapse v-model="showSearch">
      <div class="flex items-center justify-stretch gap-2">
        <TFormGroup
          name="permission-search"
          class="relative flex-auto p-1"
          :error
        >
          <TInput
            placeholder="Search..."
            class="flex-auto"
            v-model="search"
            name="permission-search"
            autocompleete="off"
            :disabled="loading"
            :ui="{
              base: 'max-w-full',
              icon: { trailing: { pointer: '', padding: { md: 'px-0' } } },
            }"
            @keydown.enter.prevent="loadPermissions"
          >
            <template #trailing>
              <TButton
                icon="tabler:search"
                :loading
                :disabled="loading"
                color="gray"
                size="md"
                variant="link"
                class="px-3"
                @click="loadPermissions"
              />
            </template>
          </TInput>
        </TFormGroup>
      </div>
    </TCollapse>
    <div
      class="flex flex-auto flex-col divide-y divide-gray-400/25 overflow-auto overscroll-contain pr-3 transition-all scrollbar-thin"
      :class="{
        '-mt-4': !showSearch,
      }"
    >
      <template v-for="permission in permissions" :key="permission.id">
        <label
          :for="permission.id"
          class="flex cursor-pointer select-none items-center gap-2 px-1 py-2 transition-colors hover:bg-gray-400/10"
        >
          <div class="flex-auto">
            <TTypography
              variant="sm"
              class="font-semibold text-gray-700 dark:text-gray-200"
            >
              {{ dashToHuman(permission.name) }}
            </TTypography>
            <TTypography
              variant="sm"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ permission.description }}
            </TTypography>
          </div>
          <TCheckbox
            :modelValue="isSelected(permission)"
            :id="permission.id"
            :disabled="loading"
            :ui="{ base: 'h-5 w-5', border: 'border-2' }"
            @change="onCheck(permission)"
          />
        </label>
      </template>
      <div
        v-if="!loading && !permissions.length"
        class="flex flex-col items-center justify-center gap-2 text-gray-400"
      >
        <TIcon
          name="tabler:database"
          class="h-6 w-6 text-gray-400 dark:text-gray-500"
        />
        <TTypography
          variant="sm"
          class="text-center text-gray-900 dark:text-white"
        >
          No permissions found
        </TTypography>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <TPagination
        v-model="pagination.page"
        :total="pagination.total"
        :pageCount="pagination.limit"
        :disabled="loading"
        size="2xs"
      />
    </div>
  </div>
</template>
