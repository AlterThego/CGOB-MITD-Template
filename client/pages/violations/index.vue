<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const { $api } = useNuxtApp();
const router = useRouter();
const violations = ref([])
const toast = useToast()

const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'name',
    label: 'Name'
}, {
    key: 'penalty',
    label: 'Penalty'
}, {
    key: 'ordinance',
    label: 'Ordinance'
}, {
    key: 'fine',
    label: 'Fine'
},
{
    key: 'deleted_at',
    label: 'Date Deleted'
}, {
    key: 'actions'
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

</script>

<template>
    <div class="w-full max-w-screen-xl mx-auto my-10">
        <TCard>
            <template #header>
                <h1>Violations</h1>
                <CreateModal/>
            </template>


            <TTable :rows="violations" :columns="columns" class="w-full">
                <template #actions-data="{ row }">
                    <TDropdown :items="items(row)">
                        <TButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </TDropdown>
                </template>
            </TTable>



            <template #footer>

            </template>
        </TCard>
    </div>

</template>
