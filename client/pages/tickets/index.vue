<script setup lang="ts">
// import { tickets } from './datasets/dummy';
const { $api } = useNuxtApp();
const router = useRouter();
const tickets = ref([])

type Ticket = {
    id: number
    citation_number: string
    status: string
    violator: {
        id: number,
        first_name: string,
        middle_name: string,
        last_name: string,
        gender: string,
        full_name: string
    },
    created_at: string
}

const form = ref({
    citation_number: '',
    status: '',
    violator: {
        first_name: '',
        middle_name: '',
        last_name: '',
        gender_id: ''
    }
})

const PersonRow = defineAsyncComponent(() => import("./components/index-row.vue"));

function fetchTicketList() {
    $api.get('tickets')
        .then((response) => {
            tickets.value = response.data
        })
}

function createTicket() {
    $api.post('tickets', form.value)
        .then((response) => {
            console.log(response.data)
            tickets.value = response.data
        })
}

onMounted(() => {
    fetchTicketList();
})


// Column Labels
const columns = [
    {
        label: 'ID',
        key: 'id',
        sortable: true,
    },
    {
        label: 'Violator',
        key: 'violator.full_name',
        sortable: true
    },
    {
        label: 'Citation Number',
        key: 'citation_number',
        sortable: true
    },
    {
        label: 'Status',
        key: 'status'
    },
    {
        label: 'Created At',
        key: 'created_at',
        sortable: true
    },
    {
        key: 'actions'
    },
]

const expand = ref({
    openedRows: [],
    row: null
})


// Model state
const isOpenCreateTicket = ref(false)

// Citation number max values
const maxLength = 11

// Genders
const genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'LGBTQQIP2SAA' },
    { id: 4, name: 'Attack Helicopter' },
]


// Settings for each row
const actions = (row: Ticket) => [
    [{
        label: 'View',
        icon: 'i-heroicons-user-20-solid',
        click: () => {
            // console.log('Pushing to Ticket View:', row.id)
            router.push({ name: 'tickets-view', params: { id: row.id, citation_number: row.citation_number } });
        }
    }]
]


// Filters
const todoStatus = [{
    key: 'active',
    label: 'Active',
    value: 1
}, {
    key: 'pending',
    label: 'Pending',
    value: 2,
}, {
    key: 'disposed',
    label: 'Disposed',
    value: 3,
}]

const selectedStatus = ref([])

// Genders
const statuses = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Disposed' },
]

</script>

<template>
    <div class="max-w-screen-xl mx-auto w-full py-5">
        <header class="flex justify-between items-center py-2 px-8">
            <span class="">
                <h1 class="font-bold">Tickets</h1>
            </span>
            <span class="flex gap-x-4">
                <TButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="outline"
                    label="Create New Ticket" :trailing="false" @click="isOpenCreateTicket = true" />
                <TSelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status"
                    class="w-40" />
            </span>

        </header>
        <TTable :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            v-model:expand="expand" :rows="tickets" :columns="columns">
            <template #expand="{ row }">
                <div class="p-4">
                    <pre>{{ row }}</pre>
                </div>
            </template>

            <template #actions-data="{ row }">
                <TDropdown :items="actions(row)">
                    <TButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </TDropdown>
            </template>

        </TTable>

        <TModal v-model="isOpenCreateTicket" prevent-close>
            <TCard
                :ui="{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <div clas="border-b border">
                    <div class="flex items-center justify-between border-b pb-2">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Create New Ticket
                        </h3>
                        <TButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenCreateTicket = false" />
                    </div>
                </div>


                <div class="grid grid-cols-2 gap-x-4">
                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Citation Number
                        </label>
                        <TInput v-model="form.citation_number" :maxlength="maxLength" class="w-full"
                            placeholder="12345678900">
                            <template #trailing>
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ form.citation_number.length
                                    }}/{{ maxLength
                                    }}</span>
                            </template>
                        </TInput>
                        <!-- <TInput placeholder="John" v-model="form.violator.first_name" /> -->
                    </div>

                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <TInput placeholder="John" v-model="form.violator.first_name" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-x-4">
                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Middle Name
                        </label>
                        <TInput placeholder="Michael" v-model="form.violator.middle_name" />
                    </div>

                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <TInput placeholder="Doe" v-model="form.violator.last_name" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-x-4">
                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <TInputMenu v-model="form.violator.gender_id" :options="genders" placeholder="Select a gender"
                            by="id" option-attribute="name" :search-attributes="['name']">
                        </TInputMenu>
                    </div>

                    <div class="col-span py-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <TInputMenu v-model="form.status" :options="statuses" placeholder="Set the status" by="id"
                            option-attribute="name" :search-attributes="['name']">
                        </TInputMenu>
                    </div>
                </div>



                <div class="flex w-full justify-end px-4">
                    <div class="py-2">
                        <TButton label="Submit" @click="createTicket" />
                    </div>
                </div>
            </TCard>
        </TModal>



    </div>
    {{ form }}
</template>
