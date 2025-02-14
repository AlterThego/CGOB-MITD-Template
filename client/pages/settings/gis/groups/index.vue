<script setup lang="ts">
import Editor from "./editor.vue";
import type { LocationGroup } from "~/types/models/gis";
import { twMerge } from "tailwind-merge";

const model = defineModel({
  type: Object as PropType<LocationGroup | null>,
});

const { $api } = useNuxtApp();
const { merge } = useModels();
const toast = useToast();
const { pagination, searcher } = useSearcher({
  api: "/gis/locations/groups",
  onPageChange: () => loadGroups(),
});

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "active",
    label: "Active",
    class: "w-16 text-center",
    rowClass: "text-center",
  },
  {
    key: "actions",
    class: "w-16 text-center",
    rowClass: "text-center",
  },
];

const search = ref("");
const loading = ref(false);
const groups = ref<Array<LocationGroup>>([]);
const modal = ref<{
  show: boolean;
  data?: LocationGroup | null;
}>({
  show: false,
  data: null,
});
const toggling = ref<Array<string>>([]);

const rows = computed(() =>
  groups.value.map((row) => {
    const c = twMerge(
      "select-none cursor-pointer hover:bg-primary-400/10 dark:hover:bg-primary-600/10",
      [
        row.id == model.value?.id
          ? "!bg-primary-400/25 dark:!bg-primary-600/25"
          : "",
      ],
    );
    return {
      ...row,
      class: c,
    };
  }),
);

const actions = (row: LocationGroup) => {
  return [
    [
      {
        label: "Edit",
        icon: "tabler:pencil",
        click: () => openModal(row),
      },
    ],
    [
      {
        label: row.active ? "Disable" : "Enable",
        icon: row.active ? "tabler:toggle-right" : "tabler:toggle-left",
        click: () => toggleGroup(row.id),
        iconClass: row.active
          ? "text-green-400 dark:text-green-500"
          : "text-red-400 dark:text-red-500",
      },
    ],
  ];
};

const openModal = (data: LocationGroup | null = null) => {
  modal.value.data = data;
  modal.value.show = true;
};

const toggleGroup = (id: string) => {
  toggling.value.push(id);

  $api
    .delete(`/gis/locations/group/${id}`)
    .then((response) => {
      onSave(response.data.data);

      toast.add({
        title: "Success",
        description: response.data.message ?? "Device saved successfully",
        color: "primary",
        icon: "tabler:circle-check",
      });
    })
    .finally(() => {
      toggling.value = toggling.value.filter((t) => t !== id);
    });
};

const loadGroups = () => {
  loading.value = true;
  searcher({ search: search.value })
    .then((response) => {
      groups.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSave = (data: LocationGroup) => {
  merge(groups.value, data);
  modal.value.show = false;
};

const selectRow = (row: LocationGroup) => {
  model.value = row;
};

onMounted(() => loadGroups());
</script>

<template>
  <div class="flex flex-col gap-4 space-y-4 px-3 py-4">
    <div class="flex w-full items-center gap-4">
      <TInput
        v-model="search"
        size="md"
        color="white"
        trailing-icon="tabler:search"
        placeholder="Search..."
        :ui="{
          icon: { trailing: { pointer: '', padding: { md: 'px-0' } } },
        }"
        class="flex-auto"
        @keyup.enter="loadGroups()"
      >
        <template #trailing>
          <TButton
            icon="tabler:search"
            color="gray"
            size="md"
            variant="link"
            class="px-3"
            @click="loadGroups()"
          />
        </template>
      </TInput>
      <TButton label="Add Group" @click="openModal(null)" />
    </div>
    <div class="flex-auto">
      <TTable
        :rows
        :columns
        :loading
        :loading-state="{
          label: 'Loading...',
        }"
        class="flex-auto"
        @select="selectRow"
      >
        <template #active-data="{ row }">
          <div class="flex h-full items-center justify-center">
            <TIcon
              :name="row.active ? 'tabler:circle-check' : 'tabler:circle-x'"
              :class="
                row.active
                  ? 'text-green-400 dark:text-green-500'
                  : 'text-rose-400 dark:text-rose-500'
              "
              class="text-2xl"
            />
          </div>
        </template>

        <template #actions-data="{ row }">
          <TDropdown
            :items="actions(row)"
            :popper="{ arrow: true }"
            :ui="{ wrapper: 'dark:bg-transparent' }"
          >
            <TButton
              color="gray"
              variant="link"
              :loading="toggling.includes(row.id)"
              icon="tabler:dots"
            />
          </TDropdown>
        </template>
      </TTable>
    </div>
    <div class="flex items-center justify-end">
      <TPagination
        v-model="pagination.page"
        :total="pagination.total"
        :pageCount="pagination.limit"
      />
    </div>
    <TModal v-model="modal.show">
      <Editor
        v-model="modal.data"
        @update:modelValue="onSave"
        @close="modal.show = false"
      />
    </TModal>
  </div>
</template>
