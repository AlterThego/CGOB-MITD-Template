<script setup lang="ts">
import { defineAsyncComponent } from 'vue';


const { $api } = useNuxtApp();
const router = useRouter();
const violations = ref([])
const toast = useToast()

const columns = [{
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
}, {
    key: 'actions'
}];

type Ticket = {
    id: number
    name: string
    penalty: string
    ordinance: string
    fine: number
    created_at: string
}

const form = ref({
    name: '',
    penalty: '',
    ordinance: '',
    fine: '',
})

const items = (row: Ticket) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

const CreateModal = defineAsyncComponent(() =>
    import('@/components/violations/create-modal.vue')
);

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

// Create Toast
function useCreateToast() {
    toast.add({
        title: 'Success',
        description: 'The ticket was created successfully.',
    })
}

// CreateTicket
function createTicket() {
    $api.post('tickets', form.value)
        .then(() => {
            useCreateToast()
            router.push("")
        })
}




</script>

<template>
    <div class="w-full max-w-screen-xl mx-auto my-10">
        <TCard>
            <template #header>
                <h1>Violations</h1>
                <CreateModal />
            </template>


            <TTable :rows="violations" :columns="columns" class="w-full">
                <template #actions-data="{ row }">
                    <TDropdown :items="items(row)">
                        <TButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </TDropdown>
                </template>
            </TTable>



            <template #footer>
                <Placeholder class="h-8" />
            </template>
        </TCard>
    </div>

</template>
