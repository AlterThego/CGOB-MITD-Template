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

    function ticketFetch () {
        $api.get('tickets')
            .then((response) => {
                tickets.value = response.data;
            });
    }

    function ticketCreate () {
        $api.post('tickets', form.value)
            .then((response) => {
                localStorage.setItem('toastCreateSuccess', 'The ticket was created successfully.');
                window.location.reload();
            });
    }

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

    const tableExpand = ref({
        openedRows: [],
        row: null,
    });

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

    const ticketSchema = z.object({
        citation_number: z.string()
            .min(13, 'Must be in the format 123-4567-8910')
            .regex(/^\d{3}-\d{4}-\d{4}$/, 'Must match format 123-4567-8910'),
        first_name: z.string(),
        middle_name: z.string(),
        last_name: z.string(),
        gender_id: z.number(),
        status: z.string(),
    });

    type TicketSchema = z.output<typeof ticketSchema>

    // Forms: Citation number
    const formCitationMaxLength = 13;

    function formCitationValidate () {
        if (!/^\d{3}-\d{4}-\d{4}$/.test(form.value.citation_number)) {
            alert("Invalid format! Please use XXX-XXXX-XXXX.");
        }
    };

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

    const selectedStatus = ref([]);
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
                    variant = "outline"
                    label = "Create New Ticket"
                    :trailing = "false"
                    @click = "isToggledCreateTicket = true"
                />
                <TSelectMenu
                    multiple
                    placeholder = "Status"
                    class = "w-40"
                    v-model = "selectedStatus"
                    :options = "filterStatus"
                />
            </span>
        </header>
        <!-- Table -->
        <TTable
            v-model:expand = "tableExpand"
            :loading-state = "{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...', }"
            :rows = "tickets"
            :columns = "tableColumns"
        >
            <template #expand = "{ row }">
                <div class = "p-4">
                    <pre>{{ row }}</pre>
                </div>
            </template>
            <template #actions-data = "{ row }">
                <TDropdown :items = "tableActions(row)">
                    <TButton color = "gray" variant = "ghost" icon = "i-heroicons-ellipsis-horizontal-20-solid"/>
                </TDropdown>
            </template>
        </TTable>
        <!-- Modal: Create -->
        <TModal v-model = "isToggledCreateTicket" prevent-close>
            <TCard :ui = "{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
                <!-- Header / Close-->
                <div class = "flex items-center justify-between border-b pb-2">
                    <h3 class = "text-base font-semibold leading-6 text-gray-900 dark:text-white">Create New Ticket</h3>
                    <TButton
                        color = "gray"
                        variant = "ghost"
                        icon = "i-heroicons-x-mark-20-solid"
                        class = "-my-1"
                        @click = "isToggledCreateTicket = false"
                    />
                </div>
                <!-- Form -->
                <TForm
                    class = "space-y-4z"
                    :schema = "ticketSchema"
                    :state = "form"
                >
                    <div class="flex-row">
                        <!-- WIP - Citation number / Status -->
                        <div class="flex justify-between gap-x-4 mb-6 mt-3">
                            <TFormGroup class="basis-2/3  w-full" label="Citation Number" name="citation_number">
                                <TInput v-model="form.citation_number" :maxlength="formCitationMaxLength"
                                    class="w-full" placeholder="123-4567-8910" autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup class="basis-1/3 w-full" label="Status" name="status">
                                <TInputMenu v-model="form.status" :options="formStatuses" placeholder="Set the status"
                                    by="id" option-attribute="name" :search-attributes="['name']"
                                    @update:modelValue="(selected) => form.status = selected ? String(selected.name) : ''">
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- WIP - First name / Middle name -->
                        <div class="flex justify-between gap-x-4 mb-6">
                            <TFormGroup class="w-full" label="First Name">
                                <TInput v-model="form.violator.first_name" class="w-full" placeholder="John"
                                    autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup class="w-full" label="Middle Name">
                                <TInput v-model="form.violator.middle_name" class="w-full" placeholder="Michael"
                                    autocomplete="off" />
                            </TFormGroup>
                        </div>
                        <!-- WIP - Last name / Gender -->
                        <div class="flex justify-between gap-x-4 mb-6">
                            <TFormGroup class="w-full" label="Last Name">
                                <TInput v-model="form.violator.last_name" class="w-full" placeholder="Doe"
                                    autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup class="w-full" label="Gender">
                                <TInputMenu v-model="form.violator.gender_id" :options="formGenders"
                                    placeholder="Select a gender" by="id" option-attribute="name"
                                    :search-attributes="['name']"
                                    @update:modelValue="(selected) => form.violator.gender_id = selected ? selected.id : null">
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- WIP - Submit -->
                        <div class="flex justify-between">
                            <TButton type="submit" @click="ticketCreate">
                                Submit
                            </TButton>
                        </div>
                    </div>
                </TForm>
            </TCard>
        </TModal>
    </div>
    {{ form }}
    {{ selectedStatus }}
</template>