<script setup lang="ts">
const isOpen = ref(false)

import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const route = useRoute();
const toast = useToast()
const { $api } = useNuxtApp();
const violation = ref<any>(null);

// Form for binding
const form = ref({
    name: '',
    penalty: '',
    ordinance: '',
    fine: '',
})

// Zod requirements
const schema = z.object({
    name: z.string({
        required_error: "Violation name is required",
    }),
    penalty: z.string(),
    ordinance: z.string(),
    fine: z
        .string()
        .regex(/^\d{1,6}(\.\d{1,2})?$/, {
            message: "Required format: 123456.78",
        })
        .transform(val => parseFloat(val)),
})

type Schema = z.output<typeof schema>

// Show violation function
function showViolation() {
    $api.get(`violations/${route.params.id}`)
        .then((response) => {
            violation.value = response.data;
            // Update form values based on the fetched violation
            form.value = {
                name: violation.value.name || '',
                penalty: violation.value.penalty || '',
                ordinance: violation.value.ordinance || '',
                fine: violation.value.fine || '',
            }
        })
}

// Mount violation to showViolation
onMounted(() => {
    showViolation()
})

// Update violation
function updateViolation() {
    $api.put(`violations/${route.params.id}`, form.value) // Send form values for update
        .then(() => {
            isOpen.value = false;
            toast.add({
                title: 'Success',
                description: 'The violation was updated successfully.',
            })
        })
}

// Form submission handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log('Form submitted')
    // Call updateViolation to submit the form
    updateViolation()
}
</script>


<template>
    <div>
        <TButton label="Edit" @click="isOpen = true" icon="i-heroicons-pencil-square" size="sm" color="blue"
            variant="outline" :trailing="false" />

        <TModal v-model="isOpen" prevent-close>
            <TCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Modal
                        </h3>
                        <TButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>
                <div>
                    <TForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-4">
                        <div class="flex gap-x-4 w-full pb-10">
                            <TFormGroup label="Violation Name" name="name" class="w-full">
                                <TInput v-model="form.name" autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup label="Fine" name="fine" class="w-full">
                                <TInput v-model="form.fine" autocomplete="off" />
                            </TFormGroup>
                        </div>

                        <div class="flex gap-x-4 w-full">
                            <TFormGroup label="Ordinance" name="ordinance" class="w-full">
                                <TTextarea v-model="form.ordinance" autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup label="Penalty" name="penalty" class="w-full">
                                <TTextarea v-model="form.penalty" autocomplete="off" />
                            </TFormGroup>
                        </div>

                        <div class="flex justify-end pt-5">
                            <TButton type="submit" color="blue">
                                Submit
                            </TButton>
                        </div>
                    </TForm>
                </div>
            </TCard>
        </TModal>
    </div>
</template>
