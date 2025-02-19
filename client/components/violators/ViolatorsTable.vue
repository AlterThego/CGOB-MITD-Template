<script setup lang="ts">
const router = useRouter();
const { $api } = useNuxtApp()
const violators = ref([])
const loading = ref(true);

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First Name' },
    { key: 'middle_name', label: 'Middle Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'actions', label: 'Actions' }
];

const actions = (row: Violator) => [
    [{
        label: 'View',
        icon: 'i-heroicons-user-circle-20-solid',
        click: () => viewViolator(row)
    }]
];

type Violator = {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    full_name: string;
};

function viewViolator(row: Violator) {
    if (!row.id) return;
    console.log('Navigating to View:', row.id);

    router.push({
        name: 'violators-view',
        params: { id: row.id }
    });
}

function fetchViolatorList() {
    loading.value = true;
    $api.get('violators')
        .then((response) => {
            violators.value = response.data;
        })
        .catch((error) => {
            console.error('Error fetching violators:', error);
        })
        .finally(() => {
            loading.value = false;
        });
}

onMounted(() => {
    fetchViolatorList()
})
</script>

<template>
    <div>
        <TTable :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" :loading="loading"
            :rows="violators"
            :columns="columns"
            >
            <template #actions-data="{ row }">
                <TDropdown :items="actions(row)">
                    <TButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </TDropdown>
            </template>
        </TTable>
    </div>
</template>
