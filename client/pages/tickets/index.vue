<script setup lang = "ts">
    // Import
    import { genderData } from './components/gender';
    import { statusData } from './components/status';
    import { ticketData, ticketColumns } from './components/ticket';
    import { modalToggle, modalFormData, modalFormCNMaxLength, modalFormSchema } from './components/modal-shared';
    import { modalSubmit,  } from './components/modal-create';

    // Data
    const { $api } = useNuxtApp();

    const router = useRouter();

    // Load
    onMounted(() => {
        $api.get('tickets')
            .then((response) => {
                ticketData.value = response.data;
            });
    });

    // Tickets: Action (for some reason, this section does not work elsewhere unless put here)
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

    const ticketActions = (row : Ticket) => [
        [{
            label: 'View',
            icon: 'i-heroicons-user-20-solid',
            click: () => {
                router.push({ name: 'tickets-view', params: { id: row.id, citation_number: row.citation_number, }, });
            },
        }],
    ];
</script>

<template>
    <div class = "max-w-screen-xl mx-auto w-full py-5">
        <!-- DONE: Header -->
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
                    @click = "modalToggle = true"
                />
            </span>
        </header>
        <!-- DONE: Table -->
        <TTable
            :loading-state = "{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...', }"
            :rows = "ticketData"
            :columns = "ticketColumns"
        >
            <template #status-data = "{ row }">
                <TBadge
                    size = "xs"
                    variant = "outline"
                    :label = "row.status"
                    :color = "(row.status === 'Active') ? 'green' : (row.status === 'Pending') ? 'orange' : 'red'"
                />
            </template>
            <template #actions-data = "{ row }">
                <TDropdown :items = "ticketActions(row)">
                    <TButton
                        icon = "i-heroicons-ellipsis-horizontal-20-solid"
                        color = "gray"
                        variant = "ghost"
                    />
                </TDropdown>
            </template>
        </TTable>
        <!-- DONE: Modal -->
        <TModal v-model = "modalToggle" prevent-close>
            <TCard :ui = "{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
                <!-- Header / Close-->
                <div class = "flex items-center justify-between border-b pb-2">
                    <h3 class = "text-base font-semibold leading-6 text-gray-900 dark:text-white">Create New Ticket</h3>
                    <TButton
                        icon = "i-heroicons-x-mark-20-solid"
                        class = "-my-1"
                        color = "gray"
                        variant = "ghost"
                        @click = "modalToggle = false"
                    />
                </div>
                <!-- Form -->
                <TForm
                    class = "space-y-4z"
                    :state = "modalFormData"
                    :schema = "modalFormSchema"
                >
                    <div class = "flex-row">
                        <!-- Citation number / Status -->
                        <div class = "flex justify-between gap-x-4 mb-6 mt-3">
                            <TFormGroup class = "basis-2/3 w-full" label = "Citation Number" name = "citation_number">
                                <TInput
                                    class = "w-full"
                                    placeholder = "123-4567-8910"
                                    autocomplete = "off"
                                    v-model = "modalFormData.citation_number"
                                    :maxlength = "modalFormCNMaxLength"
                                />
                            </TFormGroup>
                            <TFormGroup class = "basis-1/3 w-full" label = "Status" name = "status">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Set the status"
                                    option-attribute = "name"
                                    v-model = "modalFormData.status"
                                    :options = "statusData"
                                    :search-attributes = "['name']"
                                    @update:modelValue = "(selected) => modalFormData.status = selected ? String(selected.name) : ''"
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
                                    v-model = "modalFormData.violator.first_name"
                                />
                            </TFormGroup>
                            <TFormGroup class = "w-full" label = "Middle Name">
                                <TInput
                                    class = "w-full"
                                    placeholder = "Michael"
                                    autocomplete = "off"
                                    v-model = "modalFormData.violator.middle_name"
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
                                    v-model = "modalFormData.violator.last_name"
                                />
                            </TFormGroup>
                            <TFormGroup class = "w-full" label = "Gender">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Select a gender"
                                    option-attribute = "name"
                                    v-model = "modalFormData.violator.gender_id"
                                    :options = "genderData"
                                    :search-attributes = "['name']"
                                    @update:modelValue = "(selected) => modalFormData.violator.gender_id = selected ? selected.id : null"
                                >
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- Submit -->
                        <div class = "flex justify-between">
                            <TButton type = "submit" @click = "modalSubmit">Submit</TButton>
                        </div>
                    </div>
                </TForm>
            </TCard>
        </TModal>
    </div>
</template>