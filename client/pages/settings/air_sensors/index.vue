<script setup lang="ts">
import type { AirSensor } from "~/types/models";

const Editor = defineAsyncComponent(() => import("./editor/index.vue"));

const { $api } = useNuxtApp();
const { merge } = useModels();
const { pagination, searcher } = useSearcher({
  api: "/aeron/sensors",
  appendToUrl: true,
  onPageChange: () => loadSensors(),
});

const search = ref("");
const loading = ref(false);
const loadingMessage = ref("");
const devices = ref<Array<AirSensor>>([]);
const toggler = ref({
  id: "",
  loading: false,
});
const modal = ref<{
  show: boolean;
  data?: AirSensor;
  type: string;
}>({
  show: false,
  data: undefined,
  type: "",
});

const columns = [
  {
    key: "usn",
    label: "USN",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "coordinates.latitude",
    label: "Latitude",
  },
  {
    key: "coordinates.longitude",
    label: "Longitude",
  },
  {
    key: "statuses.success",
    label: "Success",
    class: "text-center",
    rowClass:
      "bg-gray-100/50 dark:bg-gray-800/50 text-green-400 dark:text-green-500 text-center",
  },
  {
    key: "statuses.failed",
    label: "Fails",
    class: "text-center",
    rowClass:
      "bg-gray-100/50 dark:bg-gray-800/50 text-rose-400 dark:text-rose-500 text-center",
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

const formatted = computed(() =>
  devices.value.map((e: AirSensor) => ({
    ...e,
    class: e.active ? "" : "bg-rose-400/25 dark:bg-rose-500/25",
  })),
);

const actions = (row: any) => {
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
        click: () => toggleSensor(row.id),
      },
    ],
  ];
};

const openModal = (data?: any, type: string = "") => {
  modal.value.data = data;
  modal.value.type = type;
  modal.value.show = true;
};

const loadSensors = () => {
  loading.value = true;
  loadingMessage.value = "Loading air sensors...";

  searcher({ search: search.value })
    .then((res) => {
      devices.value = res.data.data as Array<AirSensor>;
    })
    .finally(() => {
      loading.value = false;
    });
};

const toggleSensor = (id: string) => {
  toggler.value.id = id;
  toggler.value.loading = true;
  $api
    .delete(`/aeron/sensor/${id}`)
    .then((response) => {
      onEditorSave(response.data.data);
    })
    .finally(() => {
      toggler.value.loading = false;
    });
};

const onEditorSave = (data: AirSensor) => {
  merge(devices.value, data);
  modal.value.show = false;
};

onMounted(loadSensors);
</script>

<template>
  <div class="flex h-full w-full flex-col gap-4">
    <div class="w-full px-6 pb-4 pt-6">
      <div class="flex items-center justify-between">
        <TInput
          v-model="search"
          size="md"
          color="white"
          trailing-icon="tabler:search"
          placeholder="Search..."
          :ui="{
            icon: { trailing: { pointer: '', padding: { md: 'px-0' } } },
          }"
          @keyup.enter="loadSensors()"
        >
          <template #trailing>
            <TButton
              icon="tabler:search"
              color="gray"
              size="md"
              variant="link"
              class="px-3"
              @click="loadSensors()"
            />
          </template>
        </TInput>
        <div class="flex items-center gap-3">
          <TButton
            label="New Sensor"
            icon="tabler:plus"
            @click="openModal(null)"
          />
        </div>
      </div>
    </div>
    <TContainer class="flex w-full flex-col gap-4 pt-0">
      <TTable
        :rows="formatted"
        :columns="columns"
        :loading
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :ui="{
          tr: {
            selected: 'bg-rose-100 dark:bg-rose-400/25',
          },
        }"
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
          <TDropdown :items="actions(row)" :popper="{ arrow: true }">
            <TButton
              color="gray"
              variant="link"
              :loading="toggler.loading && toggler.id === row.id"
              icon="tabler:dots"
              :ui="{ color: { gray: { link: 'bg-gray-50 dark:bg-gray-900' } } }"
            />
          </TDropdown>
        </template>
      </TTable>
      <div class="flex items-center justify-end">
        <TPagination
          v-model="pagination.page"
          :total="pagination.total"
          :pageCount="pagination.limit"
        />
      </div>
    </TContainer>
    <TModal
      v-model="modal.show"
      prevent-close
      :ui="{ width: 'w-screen-95 sm:max-w-md' }"
    >
      <Editor
        v-model="modal.data"
        @update:modelValue="onEditorSave"
        @close="modal.show = false"
      />
    </TModal>
  </div>
</template>
