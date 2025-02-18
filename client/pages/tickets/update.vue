<script lang="ts" setup>
// Columns
import { ref, computed } from 'vue'

const columns = [{
    key: 'select',
    class: 'w-2'
}, {
    key: 'id',
    label: '#',
    sortable: true
}, {
    key: 'title',
    label: 'Title',
    sortable: true
}, {
    key: 'completed',
    label: 'Status',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false
}]

// Define Todo type
type Todo = {
    id: number
    title: string
    status: string
}

// Define Status type for filtering
type Status = {
    key: string
    label: string
    value: boolean
}

// Define the status options for filtering
const todoStatus: Status[] = [{
    key: 'uncompleted',
    label: 'In Progress',
    value: false
}, {
    key: 'completed',
    label: 'Completed',
    value: true
}]

// Define selectedColumns
const selectedColumns = ref(columns)

// Define computed columnsTable with proper typing
const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)))
const excludeSelectColumn = computed(() => columns.filter(v => v.key !== 'select'))

// Selected Rows
const selectedRows = ref<Todo[]>([])

// Select function to toggle Todo in selectedRows
function select(row: Todo) {
    const index = selectedRows.value.findIndex(item => item.id === row.id)
    if (index === -1) {
        selectedRows.value.push(row)
    } else {
        selectedRows.value.splice(index, 1)
    }
}

// Actions for batch processing (completed, uncompleted)
const actions = [
    [{
        key: 'completed',
        label: 'Completed',
        icon: 'i-heroicons-check'
    }], [{
        key: 'uncompleted',
        label: 'In Progress',
        icon: 'i-heroicons-arrow-path'
    }]
]

// Filters and search logic
const search = ref('')
const selectedStatus = ref<Status[]>([]) // Explicit typing for the selected status array
const searchStatus = computed(() => {
    if (selectedStatus.value.length === 0) {
        return ''
    }

    if (selectedStatus.value.length > 1) {
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
    }

    return `?completed=${selectedStatus.value[0].value}`
})

// Reset filters
const resetFilters = () => {
    search.value = ''
    selectedStatus.value = []
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Data fetching
const { data: todos, status } = await useLazyAsyncData<{
    id: number
    title: string
    completed: string
}[]>('todos', () => ($fetch as any)(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
    query: {
        q: search.value,
        _page: page.value,
        _limit: pageCount.value,
        _sort: sort.value.column,
        _order: sort.value.direction
    }
}), {
    default: () => [],
    watch: [page, search, searchStatus, pageCount, sort]
})
</script>

<template>
    <TCard class="w-full max-w-screen-xl mx-auto" :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' }
    }">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                Todos
            </h2>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <TInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

            <TSelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>

                <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
            </div>

            <div class="flex gap-1.5 items-center">
                <TDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
                    <TButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs">
                        Mark as
                    </TButton>
                </TDropdown>

                <TSelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
                    <TButton icon="i-heroicons-view-columns" color="gray" size="xs">
                        Columns
                    </TButton>
                </TSelectMenu>

                <TButton icon="i-heroicons-funnel" color="gray" size="xs"
                    :disabled="search === '' && selectedStatus.length === 0" @click="resetFilters">
                    Reset
                </TButton>
            </div>
        </div>

        <!-- Table -->
        <TTable v-model="selectedRows" v-model:sort="sort" :rows="todos" :columns="columnsTable"
            :loading="status === 'pending'" sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down"
            sort-mode="manual" class="w-full"
            :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' as any } } }"
            @select="select">
            <template #completed-data="{ row }">
                <TBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'"
                    :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />
            </template>

            <template #actions-data="{ row }">
                <TButton v-if="!row.completed" icon="i-heroicons-check" size="2xs" color="emerald" variant="outline"
                    :ui="{ rounded: 'rounded-full' }" square />

                <UButton v-else icon="i-heroicons-arrow-path" size="2xs" color="orange" variant="outline"
                    :ui="{ rounded: 'rounded-full' }" square />
            </template>
        </TTable>

        <!-- Number of rows & Pagination -->
        <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <div>
                    <span class="text-sm leading-5">
                        Showing
                        <span class="font-medium">{{ pageFrom }}</span>
                        to
                        <span class="font-medium">{{ pageTo }}</span>
                        of
                        <span class="font-medium">{{ pageTotal }}</span>
                        results
                    </span>
                </div>

                <TPagination v-model="page" :page-count="pageCount" :total="pageTotal" :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-[32px] justify-center',
                    default: {
                        activeButton: {
                            variant: 'outline'
                        }
                    }
                }" />
            </div>
        </template>
    </TCard>
</template>
