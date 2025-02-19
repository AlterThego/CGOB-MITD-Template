<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { ref } from 'vue';
const { $api } = useNuxtApp();
const router = useRouter();
const violations = ref([])
const toast = useToast()

const sort = ref<{ column: string; direction: "asc" | "desc" }>({
    column: 'id',
    direction: 'asc'
});


const columns = [{
    key: 'id',
    label: 'ID',
    sortable: true,
}, {
    key: 'name',
    label: 'Name',
    sortable: true
}, {
    key: 'penalty',
    label: 'Penalty',
    sortable: true
}, {
    key: 'ordinance',
    label: 'Ordinance',
    sortable: true
}, {
    key: 'fine',
    label: 'Fine',
    sortable: true
},
{
    key: 'deleted_at',
    label: 'Date Deleted',
}, {
    key: 'actions',
    label: 'Actions',
}];

type Violation = {
    id: number
    name: string
    penalty: string
    ordinance: string
    fine: number
    created_at: string
    deleted_at: string
}

const items = (row: Violation) => [
    [{
        label: 'View',
        icon: 'i-heroicons-view-columns-20-solid',
        click: () => {
            // console.log('Pushing to Ticket View:', row.id)
            router.push({ name: 'violations-view', params: { id: row.id } });
        }
    }]
]

const CreateModal = defineAsyncComponent(() =>
    import('@/components/violations/create-modal.vue')
)
// LIST
function getViolationsList() {
    $api.get('violations')
        .then((response) => {
            violations.value = response.data
        })
}

onMounted(() => {
    getViolationsList();
})

const selectedColumns = ref([...columns])

</script>

<template>
    <div class="w-full max-w-screen-xl mx-auto my-10">
        <TCard>
            <template #header>
                <div class="flex justify-between items-center w-full">

                    <h1 class="font-bold">Violations</h1>


                    <div class="flex justify-between items-center gap-x-4">
                        <CreateModal />
                        <TSelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
                    </div>
                </div>


            </template>

            <div class="p-2">
                <TTable :sort="sort" :rows="violations" :columns="selectedColumns" class="w-full" loading >
                    <template #actions-data="{ row }">
                        <TDropdown :items="items(row)">
                            <TButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                        </TDropdown>
                    </template>
                </TTable>
            </div>


            <template #footer>

            </template>
        </TCard>
    </div>

</template>
