<script setup lang = "ts">
    // Meta
    import { z } from 'zod';

    const { $api } = useNuxtApp();
    const router = useRouter();
    const toast = useToast();
    const tickets = ref([]);

    // Tickets
    type Ticket = {
        id: number,
        citation_number: string,
        status: string,
        violator: {
            id: number,
            first_name: string,
            middle_name: string,
            last_name: string,
            gender: string,
            full_name: string,
        },
        created_at: string,
    };

    const ticketFetch = () => {
        $api.get('tickets')
            .then((response) => {
                tickets.value = response.data;
            });
    };
    const ticketCreate = () => {
        $api.post('tickets', form.value)
            .then((response) => {
                localStorage.setItem('toastCreateSuccess', 'The ticket was created successfully.');
                window.location.reload();
            });
    };

    onMounted(() => {
        ticketFetch();

        if (localStorage.getItem('toastCreateSuccess')) {
            localStorage.removeItem('toastCreateSuccess');
            toast.add({
                title: 'Success',
                description: 'The ticket was created successfully.',
            });
        }
    });

    // Tables
    const tableColumns = [
        {
            label: 'ID',
            key: 'id',
            sortable: true,
        },
        {
            label: 'Violator',
            key: 'violator.full_name',
            sortable: true,
        },
        {
            label: 'Citation Number',
            key: 'citation_number',
            sortable: true,
        },
        {
            label: 'Status',
            key: 'status',
            sortable: true,
            class: 'grid justify-items-center',
        },
        {
            label: 'Created At',
            key: 'created_at',
            sortable: true,
        },
        {
            key: 'actions',
        },
    ];
    const tableActions = (row : Ticket) => [
        [{
            label: 'View',
            icon: 'i-heroicons-user-20-solid',
            click: () => {
                router.push({ name: 'tickets-view', params: { id: row.id, citation_number: row.citation_number, }, });
            },
        }],
    ];

    // Modals
    const isToggledCreateTicket = ref(false);

    // Forms: All
    const form = ref({
        citation_number: '',
        status: '',
        violator: {
            first_name: '',
            middle_name: '',
            last_name: '',
            gender_id: '',
        },
    });
    const formSchema = z.object({
        citation_number: z.string()
            .min(13, 'Must be in the format 123-4567-8910')
            .regex(/^\d{3}-\d{4}-\d{4}$/, 'Must match format 123-4567-8910'),
        first_name: z.string(),
        middle_name: z.string(),
        last_name: z.string(),
        gender_id: z.number(),
        status: z.string(),
    });

    type FormSchema = z.output<typeof formSchema>

    // Forms: Citation number
    const formCitationMaxLength = 13;

    // Forms: Genders
    const formGenders = [
        { id: 1, name: 'Male', },
        { id: 2, name: 'Female', },
        { id: 3, name: 'LGBTQQIP2SAA', },
        { id: 4, name: 'Attack Helicopter', },
    ];

    // Forms: Statuses
    const formStatuses = [
        { id: 1, name: 'Active', },
        { id: 2, name: 'Pending', },
        { id: 3, name: 'Disposed', },
    ];

    // Filters: Status (not working at all)
    const filterStatus = [{
        key: 'active',
        label: 'Active',
        value: 1,
    }, {
        key: 'pending',
        label: 'Pending',
        value: 2,
    }, {
        key: 'disposed',
        label: 'Disposed',
        value: 3,
    }];

    const filterStatusSelected = ref([]);

    const searchStatus = computed(() => {
        if (filterStatusSelected.value?.length === 0) {
            return ''
        }

        if (filterStatusSelected?.value?.length > 1) {
            return `?completed=${filterStatusSelected.value[0].value}&completed=${filterStatusSelected.value[1].value}`
        }

        return `?completed=${filterStatusSelected.value[0].value}`
    });
    const { data: todos, status } = await useLazyAsyncData<{
        id: number
        title: string
        completed: string
        }[]>('todos', () => ($fetch as any)(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
        query: {
        }
        }), {
        default: () => [],
            watch: [searchStatus]
        });
    
</script>

<template>
    <div class = "max-w-screen-xl mx-auto w-full py-5">
        <!-- Header -->
        <header class = "flex justify-between items-center py-2 px-8">
            <span class = "">
                <h1 class = "font-bold">Tickets</h1>
            </span>
            <span class = "flex gap-x-4">
                <TButton
                    icon = "i-heroicons-pencil-square"
                    size = "sm"
                    color = "primary"
                    label = "Create New Ticket"
                    variant = "outline"
                    :trailing = "false"
                    @click = "isToggledCreateTicket = true"
                />
                <TSelectMenu
                    class = "w-40"
                    multiple
                    placeholder = "Status"
                    v-model = "filterStatusSelected"
                    :options = "filterStatus"
                />
            </span>
        </header>
        <!-- Table -->
        <TTable
            :loading-state = "{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...', }"
            :rows = "tickets"
            :columns = "tableColumns"
        >
            <template #status-data = "{ row }">
                <TBadge
                    size = "xs"
                    variant = "subtle"
                    :label = "row.status"
                    :color = "(row.status === 'Active') ? 'green' : (row.status === 'Pending') ? 'orange' : 'red'"
                />
            </template>
            <template #actions-data = "{ row }">
                <TDropdown :items = "tableActions(row)">
                    <TButton
                        icon = "i-heroicons-ellipsis-horizontal-20-solid"
                        color = "gray"
                        variant = "ghost"
                    />
                </TDropdown>
            </template>
        </TTable>
        <!-- Modal -->
        <TModal v-model = "isToggledCreateTicket" prevent-close>
            <TCard :ui = "{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
                <!-- Header / Close-->
                <div class = "flex items-center justify-between border-b pb-2">
                    <h3 class = "text-base font-semibold leading-6 text-gray-900 dark:text-white">Create New Ticket</h3>
                    <TButton
                        icon = "i-heroicons-x-mark-20-solid"
                        class = "-my-1"
                        color = "gray"
                        variant = "ghost"
                        @click = "isToggledCreateTicket = false"
                    />
                </div>
                <!-- Form -->
                <TForm
                    class = "space-y-4z"
                    :schema = "formSchema"
                    :state = "form"
                >
                    <div class="flex-row">
                        <!-- Citation number / Status -->
                        <div class = "flex justify-between gap-x-4 mb-6 mt-3">
                            <TFormGroup class = "basis-2/3 w-full" label = "Citation Number" name = "citation_number">
                                <TInput
                                    class = "w-full"
                                    placeholder = "123-4567-8910"
                                    autocomplete = "off"
                                    v-model = "form.citation_number"
                                    :maxlength = "formCitationMaxLength"
                                />
                            </TFormGroup>
                            <TFormGroup class = "basis-1/3 w-full" label = "Status" name = "status">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Set the status"
                                    option-attribute = "name"
                                    v-model = "form.status"
                                    :options = "formStatuses"
                                    :search-attributes="['name']"
                                    @update:modelValue = "(selected) => form.status = selected ? String(selected.name) : ''"
                                >
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- First name / Middle name -->
                        <div class = "flex justify-between gap-x-4 mb-6">
                            <TFormGroup class = "w-full" label = "First Name">
                                <TInput
                                    class = "w-full"
                                    placeholder = "John"
                                    autocomplete = "off"
                                    v-model="form.violator.first_name"
                                />
                            </TFormGroup>
                            <TFormGroup class="w-full" label="Middle Name">
                                <TInput
                                    class = "w-full"
                                    placeholder = "Michael"
                                    autocomplete = "off"
                                    v-model = "form.violator.middle_name"
                                />
                            </TFormGroup>
                        </div>
                        <!-- Last name / Gender -->
                        <div class = "flex justify-between gap-x-4 mb-6">
                            <TFormGroup class = "w-full" label = "Last Name">
                                <TInput
                                    class = "w-full"
                                    placeholder = "Doe"
                                    autocomplete = "off"
                                    v-model = "form.violator.last_name"
                                />
                            </TFormGroup>
                            <TFormGroup class = "w-full" label = "Gender">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Select a gender"
                                    option-attribute = "name"
                                    v-model = "form.violator.gender_id"
                                    :options = "formGenders"
                                    :search-attributes = "['name']"
                                    @update:modelValue = "(selected) => form.violator.gender_id = selected ? selected.id : null"
                                >
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- Submit -->
                        <div class = "flex justify-between">
                            <TButton type = "submit" @click = "ticketCreate">
                                Submit
                            </TButton>
                        </div>
                    </div>
                </TForm>
            </TCard>
        </TModal>
    </div>
    {{ form }}
    <br/>
    {{ filterStatusSelected }}
</template>