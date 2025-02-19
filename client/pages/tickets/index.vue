<script setup lang = "ts">
    // IMPORT
    import { genderData } from './data/gender';
    import { statusData } from './data/status';
    import { modalSubmit,  } from './data/modal-create';
    import { modalToggle, modalFormData, modalFormCNMaxLength, modalFormSchema } from './data/modal-shared';
    import { ticketDataAll, ticketColumns, ticketFetchAll } from './data/ticket';

    // DATA
    const router = useRouter();

    // LOAD
    onMounted(() => {
        ticketFetchAll();
    });

    // TICKET: Action (for some reason, this section does not work elsewhere unless put here)
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
            icon: 'i-heroicons-user',
            click: () => {
                router.push({ name: 'tickets-view', params: { id: row.id, citation_number: row.citation_number, }, });
            },
        }],
    ];
</script>

<template>
    <div class = "max-w-screen-xl mx-auto p-4 w-full">
        <!-- HEADER -->
        <header class = "flex items-center justify-between py-2">
            <h1 class = "font-bold">Tickets</h1>
            <TButton
                icon = "i-heroicons-pencil-square"
                size = "sm"
                color = "emerald"
                label = "Create New Ticket"
                variant = "outline"
                @click = "modalToggle = true"
            />
        </header>
        <!-- TABLE -->
        <TTable
            :rows = "ticketDataAll"
            :columns = "ticketColumns"
        >
            <template #status-data = "{ row }">
                <TBadge
                    size = "xs"
                    class = "flex justify-center"
                    variant = "outline"
                    :label = "(row.deleted_at !== null) ? 'Soft Deleted' : row.status"
                    :color = "(row.deleted_at !== null) ? 'gray' : (row.status === 'Active') ? 'green' : (row.status === 'Pending') ? 'orange' : 'red'"
                />
            </template>
            <template #actions-data = "{ row }">
                <TDropdown :items = "ticketActions(row)">
                    <TButton
                        icon = "i-heroicons-ellipsis-horizontal"
                        color = "gray"
                        variant = "ghost"
                    />
                </TDropdown>
            </template>
        </TTable>
        <!-- MODAL -->
        <TModal v-model = "modalToggle" prevent-close>
            <TCard class = "max-w-screen-sm mx-auto w-full">
                <!-- HEADER | CLOSE-->
                <template #header>
                    <h1 class = "font-bold">Create Ticket</h1>
                    <TButton
                        icon = "i-heroicons-x-mark"
                        class = "m-0 p-0"
                        color = "gray"
                        variant = "ghost"
                        @click = "modalToggle = false"
                    />
                </template>
                <!-- FORM -->
                <TForm
                    :state = "modalFormData"
                    :schema = "modalFormSchema"
                >
                    <!-- CITATION NUMBER | STATUS -->
                    <div class = "flex gap-4 justify-between p-4">
                        <TFormGroup class = "w-full" label = "Citation Number" name = "citation_number">
                            <TInput
                                placeholder = "123-4567-8910"
                                autocomplete = "off"
                                v-model = "modalFormData.citation_number"
                                :maxlength = "modalFormCNMaxLength"
                            />
                        </TFormGroup>
                        <TFormGroup class = "w-full" label = "Status" name = "status">
                            <TInputMenu
                                by = "id"
                                placeholder = "Select status"
                                option-attribute = "name"
                                v-model = "modalFormData.status"
                                :options = "statusData"
                                :search-attributes = "['name']"
                                @update:modelValue = "(selected) => modalFormData.status = selected ? String(selected.name) : ''"
                            >
                            </TInputMenu>
                        </TFormGroup>
                    </div>
                    <!-- FIRST NAME | MIDDLE NAME -->
                    <div class = "flex gap-4 justify-between p-4">
                        <TFormGroup class = "w-full" label = "First Name">
                            <TInput
                                placeholder = "John"
                                autocomplete = "off"
                                v-model = "modalFormData.violator.first_name"
                            />
                        </TFormGroup>
                        <TFormGroup class = "w-full" label = "Middle Name">
                            <TInput
                                placeholder = "Michael"
                                autocomplete = "off"
                                v-model = "modalFormData.violator.middle_name"
                            />
                        </TFormGroup>
                    </div>
                    <!-- LAST NAME | GENDER -->
                    <div class = "flex gap-4 justify-between p-4">
                        <TFormGroup class = "w-full" label = "Last Name">
                            <TInput
                                placeholder = "Doe"
                                autocomplete = "off"
                                v-model = "modalFormData.violator.last_name"
                            />
                        </TFormGroup>
                        <TFormGroup class = "w-full" label = "Gender">
                            <TInputMenu
                                by = "id"
                                placeholder = "Select gender"
                                option-attribute = "name"
                                v-model = "modalFormData.violator.gender_id"
                                :options = "genderData"
                                :search-attributes = "['name']"
                                @update:modelValue = "(selected) => modalFormData.violator.gender_id = selected ? selected.id : null"
                            >
                            </TInputMenu>
                        </TFormGroup>
                    </div>
                    <!-- SUBMIT -->
                    <div class = "flex justify-between p-4">
                        <TButton
                            icon = "i-heroicons-plus"
                            size = "sm"
                            type = "submit"
                            class = "justify-center w-full"
                            color = "emerald"
                            variant = "outline"
                            @click = "modalSubmit"
                        >
                            Submit
                        </TButton>
                    </div>
                </TForm>
            </TCard>
        </TModal>
    </div>
</template>