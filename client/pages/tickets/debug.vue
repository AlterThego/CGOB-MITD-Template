<script lang = "ts" setup>
	// Meta
	import { z } from 'zod';

	const { $api } = useNuxtApp();
	const router = useRouter();
	const toast = useToast();
	const tickets = ref([]);

	// [PENDING] Columns
	const columns = [{
		key: 'id',
		label: 'id',
		sortable: true,
	}, {
		key: 'title',
		label: 'Violator',
		sortable: true,
	}, {
		key: 'completed',
		label: 'Status',
		sortable: true
	}, {
		key: 'actions',
		label: 'Actions',
		sortable: false
	}];
	// WIP CHECKPOINT
	const resetFilters = () => {
	search.value = ''
	selectedStatus.value = []
	}

	const selectedColumns = ref(columns)
	const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)))
	const excludeSelectColumn = computed(() => columns.filter(v => v.key !== 'select'))

	// PENDING: Filters
	const filterStatus = ['true', 'false'];

	const search = ref('')
	const selectedStatus = ref([])
	const searchStatus = computed(() => {
		if (selectedStatus.value?.length === 0) {
			return '';
		}
		return `?completed=${selectedStatus.value}`;
	});

	// PENDING: Pagination
	const sort = ref({ column: 'id', direction: 'asc' as const });
	const page = ref(1);
	const pageCount = ref(10);
	const pageTotal = ref(200); // This value should be dynamic coming from the API
	const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
	const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value));

// Data
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
	{{ searchStatus }}
	<TCard class = "max-w-screen-xl mx-auto w-full py-5">
		<!-- Header -->
		<template #header>
			<h2 class = "font-semibold text-xl text-gray-900 dark:text-white leading-tight">Tickets</h2>
		</template>
		<!-- Filters -->
		<div class = "flex items-center justify-between gap-3 px-4 py-3">
			<TInput
				icon = "i-heroicons-magnifying-glass-20-solid"
				placeholder = "Search..."
				v-model = "search"
			/>
			<TSelectMenu
				class = "w-40"
				placeholder = "Status"
				v-model = "selectedStatus"
				:options = "filterStatus"
			/>
		</div>
		<!-- Actions -->
		<div class = "flex justify-between items-center w-full px-4 py-3">
			<div class = "flex items-center gap-1.5">
				<span class = "text-sm leading-5">Rows per page:</span>
				<TSelect
					size = "xs"
					class = "me-2 w-20"
					v-model = "pageCount"
					:options = "[3, 5, 10, 20, 30, 40]"
				/>
			</div>
			<div class = "flex gap-1.5 items-center">
				<TSelectMenu
					v-model = "selectedColumns"
					:options = "excludeSelectColumn"
					multiple
				>
					<TButton
						icon = "i-heroicons-view-columns"
						size = "xs"
						color = "gray"
					>
						Columns
					</TButton>
				</TSelectMenu>
				<TButton
					icon = "i-heroicons-funnel"
					size = "xs"
					color = "gray"
					:disabled = "search === '' && selectedStatus.length === 0"
					@click="resetFilters"
				>
					Reset
				</TButton>
			</div>
		</div>
		<!-- Table [PENDING: Badge, Action] -->
		<TTable
			class = "w-full"
			sort-mode = "manual"
			sort-asc-icon = "i-heroicons-arrow-up"
			sort-desc-icon = "i-heroicons-arrow-down"
			v-model:sort = "sort"
			:rows = "todos"
			:columns = "columnsTable"
			:loading = "status === 'pending'"
			:ui = "{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' as any }, }, }"
		>
			<template #completed-data = "{ row }">
				<TBadge
					size = "xs"
					variant = "subtle"
					:label = "row.completed ? 'Completed' : 'In Progress'"
					:color = "row.completed ? 'emerald' : 'orange'"
				/>
			</template>
			<template #actions-data = "{ row }">TButton Here</template>
		</TTable>
		<!-- Pagination -->
		<template #footer>
			<div class = "flex flex-wrap justify-between items-center">
				<div>
					<span class = "text-sm leading-5">
						Showing
						<span class = "font-medium">{{ pageFrom }}</span>
						to
						<span class = "font-medium">{{ pageTo }}</span>
						of
						<span class = "font-medium">{{ pageTotal }}</span>
						results
					</span>
				</div>
				<TPagination
					v-model="page"
					:ui="{
						wrapper: 'flex items-center gap-1',
						rounded: '!rounded-full min-w-[32px] justify-center',
						default: {
							activeButton: {
								variant: 'outline',
							},
						},
					}"
					:total = "pageTotal"
					:page-count = "pageCount"
				/>
			</div>
		</template>
	</TCard>
</template>