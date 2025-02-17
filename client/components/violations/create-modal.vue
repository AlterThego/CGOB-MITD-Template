<script setup lang="ts">
const isOpen = ref(false)

import { z } from 'zod'

const schema = z.object({
    name: z.string(),
    penalty: z.string(),
    ordinance: z.string(),
    fine: z.number().max(6),
})

type Schema = z.output<typeof schema>

const state = reactive({
    name: '',
    penalty: '',
    ordinance: '',
    fine: '',
})

</script>

<template>
    <div>
        <TButton label="Create Violations" @click="isOpen = true" icon="i-heroicons-pencil-square" size="sm"
            color="primary" variant="outline" :trailing="false" />

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
                    <TForm :schema="schema" :state="state" class="space-y-4">
                        <div class="flex gap-x-4 w-full">
                            <TFormGroup label="Violation Name" name="name" class="w-full">
                                <TInput v-model="state.name" autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup label="Penalty" name="penalty" class="w-full">
                                <TInput v-model="state.penalty" autocomplete="off" />
                            </TFormGroup>
                        </div>

                        <div class="flex gap-x-4 w-full">
                            <TFormGroup label="Ordinance" name="name" class="w-full">
                                <TInput v-model="state.ordinance" autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup label="Fine" name="penalty" class="w-full">
                                <TInput v-model="state.fine" autocomplete="off" />
                            </TFormGroup>
                        </div>


                        {{ state }}
                        <TButton type="submit">
                            Submit
                        </TButton>
                    </TForm>
                </div>

                <Placeholder class="h-32" />
            </TCard>
        </TModal>
    </div>
</template>
