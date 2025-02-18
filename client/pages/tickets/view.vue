<script setup lang = "ts">
    // Import
    import { genderData } from './data/gender';
    import { statusData } from './data/status';
    import { modalToggle, modalFormData, modalFormCNMaxLength, modalFormSchema } from './data/modal-shared';
    import { modalUpdate, modalDelete, modalRestore } from './data/modal-update';

    // Data
    const { $api } = useNuxtApp();

    const route = useRoute();
    const ticket = ref();

    // Load
    onMounted(() => {
        $api.get(`tickets/${route.params.id}`)
            .then((response) => {
                // WARNING: property "gender" is retrieved. Do not be confused with "gender_id"
                ticket.value = response.data;

                // Swap the fetched gender string into id format
                const getGenderID = (name : any) => {
                    const gender = genderData.find(g => g.name === name);
                    return gender ? gender.id : "Unknown";
                };

                // Set
                ticket.value.violator.gender_id = getGenderID(ticket.value.violator.gender);
                modalFormData.value = ticket.value;
            });
    });

    // Avatar
    const avatarSeed = computed(() => {
        return ticket.value?.violator.first_name.replaceAll(' ', '+');
    });
</script>

<template>
    <div class = "max-w-screen-sm mx-auto w-full py-6">
        <!-- model-valueCard-->
        <TCard class = "shadow-lg border border-gray-200">
            <template #header>
                <h2 class = "text-lg font-semibold text-gray-800">Violation Ticket</h2>
            </template>
            <div class = "flex items-center gap-4 p-4">
                <TAvatar
                    alt = "User Avatar"
                    size = "xl"
                    :src = "`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                />
                <div class = "flex-row gap-y-10">
                    <p class = "text-gray-600 text-xs">Ticket ID: <span class = "font-medium">{{ ticket?.id }}</span></p>
                    <h1 class = "text-2xl font-semibold text-gray-900">{{ ticket?.violator.full_name }}</h1>
                    <p class = "text-gray-600 text-xs">Gender: <span class = "font-sm">{{ ticket?.violator.gender }}</span></p>
                    <p class = "text-gray-600 text-sm">Citation Number: <span class = "font-bold">{{ ticket?.citation_number }}</span></p>
                    <p class = "text-red-500 text-sm font-semibold"> {{ ticket?.status }}</p>
                </div>
            </div>
            <template #footer>
                <div class = "flex items-center gap-3 justify-center py-3">
                    <TButton
                        icon = "i-heroicons-arrow-left"
                        color = "gray"
                        variant = "outline"
                        :to = "{ name: 'tickets-index' }"
                    >
                        Back to List
                    </TButton>
                    <TButton
                        icon = "i-heroicons-pencil-square-20-solid"
                        color = "primary"
                        variant = "outline"
                        @click = "modalToggle = true"
                    >
                        Update
                    </TButton>
                    <TButton
                        icon = "i-heroicons-trash"
                        color = "red"
                        variant = "outline"
                        :disabled = "(ticket?.deleted_at !== null) ? true : false"
                        @click = "modalDelete"
                    >
                        Delete
                    </TButton>
                    <TButton
                        icon = "i-heroicons-archive-box"
                        color = "blue"
                        variant = "outline"
                        :disabled = "(ticket?.deleted_at !== null) ? false : true"
                        @click = "modalRestore"
                    >
                        Restore
                    </TButton>
                </div>
            </template>
        </TCard>
        <!-- model-valueModal -->
        <TModal v-model = "modalToggle" prevent-close>
            <TCard :ui = "{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <!-- Header / Close-->
                <div class = "flex items-center justify-between border-b pb-2">
                    <h3 class = "text-base font-semibold leading-6 text-gray-900 dark:text-white">Update Ticket</h3>
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
                                    :model-value = "ticket?.citation_number"
                                />
                            </TFormGroup>
                            <TFormGroup class = "basis-1/3 w-full" label = "Status" name = "status">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Set the status"
                                    option-attribute = "name"
                                    v-model = "modalFormData.status"
                                    :options = "statusData"
                                    :model-value = "ticket?.status"
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
                                    :model-value = "ticket?.violator.first_name"
                                />
                            </TFormGroup>
                            <TFormGroup class = "w-full" label = "Middle Name">
                                <TInput
                                    class = "w-full"
                                    placeholder = "Michael"
                                    autocomplete = "off"
                                    v-model = "modalFormData.violator.middle_name"
                                    :model-value = "ticket?.violator.middle_name"
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
                                    :model-value = "ticket?.violator.last_name"
                                />
                            </TFormGroup>
                            <TFormGroup class = "w-full" label = "Gender">
                                <TInputMenu
                                    by = "id"
                                    placeholder = "Select a gender"
                                    option-attribute = "name"
                                    v-model = "modalFormData.violator.gender_id"
                                    :options = "genderData"
                                    :model-value = "ticket?.violator.gender_id"
                                    :search-attributes = "['name']"
                                    @update:modelValue = "(selected) => modalFormData.violator.gender_id = selected ? selected.id : null"
                                >
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                        <!-- Submit -->
                        <div class = "flex justify-between">
                            <TButton type = "submit" @click = "modalUpdate">Submit</TButton>
                        </div>
                    </div>
                </TForm>
            </TCard>
        </TModal>
    </div>
</template>