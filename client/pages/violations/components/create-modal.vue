<script setup lang="ts">
// Api integration
const { $api } = useNuxtApp();
const violations = ref([]);
// Modal flag
const isOpen = ref(false)

// Zod import
import { z } from 'zod'

// Submit event
import type { FormSubmitEvent } from '#ui/types'

// Toast
const toast = useToast()

// Schema for zod input validation
const schema = z.object({
    name: z.string({
        required_error: "Violation name is required",
    }),
    penalty: z.string({
        required_error: "Penalty is required",
    }),
    ordinance: z.string({
        required_error: "Ordinance is required",
    }),
    fine: z
        .string({
            required_error: "Fine is required",
        })
        .regex(/^\d{1,6}(\.\d{1,2})?$/, {
            message: "Reqired format: 123 456.78",
        })
        .transform(val => parseFloat(val)),
})

// Zod schema
type Schema = z.output<typeof schema>

// Create form
const form = ref({
    name: undefined,
    penalty: undefined,
    ordinance: undefined,
    fine: undefined,
})

// CreateTicket
function createViolation() {
    $api.post('violations', form.value)
        .then(() => {
            isOpen.value = false;
            form.value = {
                name: undefined,
                penalty: undefined,
                ordinance: undefined,
                fine: undefined,
            }
            toast.add({
                title: 'Success',
                description: 'The ticket was created successfully.',
            });
            getViolationsList()
        })
        .finally(() => {
            getViolationsList()
        })
}

// Submit 
async function onSubmit(event: FormSubmitEvent<Schema>) {
    createViolation();
}


async function getViolationsList() {
    // use Search function from Searcher Composable.
    const { data } = await search();
    // assign the value to violations.
    violations.value = data.data
}

// Mount
onMounted(() => {
    getViolationsList();
})

// @ts-ignore


// Searcher Component
const { search, pagination } = useSearcher({
    // List Backend Route
    api: 'violations/archived',
    // limit,
    limit: 10,
    method: 'get',
    // Callback Function to call on Page Change
    onPageChange: getViolationsList,
});

// @ts-ignore
watch(() => pagination.page, async () => await search());

</script>

<template>
    <div>
        <TButton label="Create Violation" @click="isOpen = true" icon="i-heroicons-pencil-square" size="sm"
            color="primary" variant="outline" :trailing="false" />

        <TModal v-model="isOpen" prevent-close>
            <TCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Create Violation
                        </h3>
                        <TButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>
                <div>
                    <TForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-4">
                        <div class="flex gap-x-4 w-full pb-3">
                            <TFormGroup label="Violation Name" name="name" class="w-full">
                                <TInput v-model="form.name" autocomplete="off" placeholder="Speeding" />
                            </TFormGroup>
                            <TFormGroup label="Fine" name="fine" class="w-full">
                                <TInput v-model="form.fine" autocomplete="off" placeholder="200" />
                            </TFormGroup>
                        </div>

                        <div class="flex gap-x-4 w-full">
                            <TFormGroup label="Ordinance" name="ordinance" class="w-full">
                                <TTextarea v-model="form.ordinance" autocomplete="off"
                                    placeholder="Ordinance No. 1023" />
                            </TFormGroup>
                            <TFormGroup label="Penalty" name="penalty" class="w-full">
                                <TTextarea v-model="form.penalty" autocomplete="off" placeholder="License Suspension" />
                            </TFormGroup>

                        </div>


                        <div class="flex justify-end pt-3">
                            <TButton type="submit" variant="outline" block icon="i-heroicons-arrow-long-right"
                                :trailing="true">
                                Create


                            </TButton>
                        </div>

                    </TForm>
                </div>

            </TCard>
        </TModal>
    </div>
</template>
