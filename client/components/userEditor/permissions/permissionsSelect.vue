<script setup lang="ts">
import type { PermissionItem } from "~/types/models/permission";

const { dashToHuman } = useUtils();

const props = defineProps<{
  searchApi: string;
  viewSelected?: boolean;
  locked?: Array<string>;
  compact?: boolean;
  striped?: boolean;
  searchOptions?: SearcherOptions;
  viewOnly?: boolean;
}>();

const {
  pagination,
  params,
  loading: sLoading,
  search,
} = useSearcher<{ search: string }>({
  api: props.searchApi,
  limit: 10,
  appendToUrl: false,
  onSearch: (response) => {
    permissions.value = response.data.data as Array<PermissionItem>;
    isNone.value = modelHasNone();
  },
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
const isNone = ref(false);
const showSearch = ref(false);

const nameClass = (permission: PermissionItem): string => {
  let c = "";
  if (loading || isLocked(permission)) {
    c = "text-gray-400";
  }
  if (!loading && !isLocked(permission)) {
    c = "text-gray-700 dark:text-gray-200";
  }
  return c;
};

const modelHasNone = (): boolean => {
  return model.value.length <= 0 && (props.locked?.length ?? 0) <= 0;
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

const isLocked = (permission: PermissionItem) => {
  return props.locked?.includes(permission.id);
};

watch(sLoading, (val) => {
  loading.value = val;
});

watch(
  [model, () => props.locked],
  () => {
    isNone.value = modelHasNone();
  },
  { deep: true },
);

onMounted(() => {
  search();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2">
      <TTypography
        variant="md"
        class="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200"
      >
        <span>
          Permissions
          <template v-if="!viewOnly">{{ `(${model.length ?? 0})` }}</template>
        </span>
        <TIcon v-if="loading" name="tabler:loader-2" class="animate-spin" />
      </TTypography>
      <div class="flex items-center gap-2">
        <TPopover v-if="viewSelected && !viewOnly">
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
                  <div
                    class="jsutify-between flex items-center gap-2"
                    :class="{
                      'px-1 odd:bg-gray-400/10': viewOnly,
                    }"
                  >
                    <span class="line-clamp-1 flex-auto text-sm">
                      {{ dashToHuman(selected.name) }}
                    </span>
                    <TButton
                      v-if="!viewOnly"
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
        <label
          for="none_chk"
          class="flex select-none items-center gap-2"
          :class="{
            'cursor-not-allowed text-gray-400':
              (locked?.length ?? 0) > 0 || loading || viewOnly,
          }"
        >
          <TCheckbox
            id="none_chk"
            v-model="isNone"
            :disabled="loading || (locked?.length ?? 0) > 0 || viewOnly"
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
            v-model="params.search"
            name="permission-search"
            autocompleete="off"
            :disabled="loading"
            :ui="{
              base: 'max-w-full',
              icon: { trailing: { pointer: '', padding: { md: 'px-0' } } },
            }"
            @keydown.enter.prevent="search"
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
                @click="search"
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
          class="flex select-none items-center gap-2 px-1 transition-colors"
          :class="{
            'odd:bg-gray-500/10': striped,
            'py-1': compact,
            'py-2': !compact,
            'cursor-not-allowed':
              (loading || isLocked(permission)) && !viewOnly,
            '!bg-primary-400/10 odd:!bg-primary-400/15': isLocked(permission),
            'cursor-pointer hover:bg-gray-400/10':
              !loading && !isLocked(permission) && !viewOnly,
          }"
        >
          <div class="flex-auto">
            <TTypography
              variant="sm"
              class="font-semibold"
              :class="nameClass(permission)"
            >
              {{ dashToHuman(permission.name) }}
            </TTypography>
            <TTypography
              v-if="!compact"
              variant="sm"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ permission.description }}
            </TTypography>
          </div>
          <TCheckbox
            v-if="!viewOnly"
            :modelValue="isSelected(permission) || isLocked(permission)"
            :id="permission.id"
            :disabled="loading || isLocked(permission)"
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
