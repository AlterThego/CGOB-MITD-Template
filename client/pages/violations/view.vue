<script setup lang="ts">
import { useRouter } from 'vue-router';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const violation = ref();
const isOpen = ref(false);

// Form state
const form = ref({
    name: '',
    penalty: '',
    ordinance: '',
    fine: '',
});

// Validation schema
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
            message: "Required format: 123456.78",
        })
        .transform(val => parseFloat(val)),
});

type Schema = z.output<typeof schema>;

// API Functions
async function showViolation() {
    const response = await $api.get(`violations/${route.params.id}`);
    violation.value = response.data;
}

async function deleteViolation() {
    await $api.delete(`violations/${route.params.id}`);
    toast.add({
        title: 'Success',
        description: 'The ticket was deleted successfully.',
    });
    router.push({ name: 'violations-index' });
}

async function restoreViolation() {
    await $api.patch(`violations/${route.params.id}`);
    toast.add({
        title: 'Success',
        description: 'The ticket was restored successfully.',
    });
    router.push({ name: 'violations-index' });
}

async function updateViolation() {
    await $api.put(`violations/${route.params.id}`, form.value)
        .then(() => {
            isOpen.value = false;
            toast.add({
                title: 'Success',
                description: 'The violation was updated successfully.',
            });
            showViolation()
        })
}

// Event Handlers
async function onSubmit(event: FormSubmitEvent<Schema>) {
    await updateViolation();
}

// Initial data load
await showViolation();

// Component imports
const Spinner = defineAsyncComponent(() =>
    import('@/pages/violations/assets/spinner.vue')
);
</script>

<template>
    <div class="max-w-screen-lg mx-auto p-6 w-full">
        <TCard class="border py-3 px-2">
            <!-- Header -->
            <template #header>
                <div class="flex items-center justify-between border-b pb-4 w-full">
                    <div class="flex items-center gap-x-4">
                        <TBadge color="primary" class="text-sm">
                            ID: {{ violation?.id }}
                        </TBadge>
                        <h3 class="text-xl font-semibold">
                            Violation Record
                        </h3>
                    </div>

                    <div class="flex items-center gap-x-4">
                        <TButton v-if="!violation?.deleted_at" label="Delete Violation"
                            icon="i-heroicons-trash-20-solid" color="rose" variant="outline" @click="deleteViolation"
                            class="hover:bg-rose-50 w-40 justify-center" />

                        <TButton v-else label="Restore Violation" icon="i-heroicons-arrow-uturn-left-solid"
                            color="orange" variant="outline" @click="restoreViolation"
                            class="hover:bg-orange-50 w-40 justify-center" />
                    </div>
                </div>
            </template>

            <!-- Main Content -->
            <div class="grid grid-cols-3 gap-8 py-4">
                <!-- Left Column -->
                <div class="w-full h-full flex flex-col gap-y-4">
                    <div class="grid grid-rows-2 min-h-[60px]">
                        <span class="text-sm font-bold block">Name</span>
                        <span class="text-base">{{ violation?.name }}</span>
                    </div>
                    <div class="min-h-[60px]">
                        <span class="text-sm font-bold block">Penalty</span>
                        <span class="text-base">{{ violation?.penalty }}</span>
                    </div>
                </div>

                <!-- Middle Column -->
                <div class="w-full h-full flex flex-col gap-y-4">
                    <div class="min-h-[60px]">
                        <span class="text-sm font-bold block">Ordinance</span>
                        <span class="text-base">{{ violation?.ordinance }}</span>
                    </div>
                    <div class="min-h-[60px]">
                        <span class="text-sm font-bold block">Fine Amount</span>
                        <span class="text-base font-semibold text-primary">₱{{ violation?.fine }}</span>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="w-full h-full flex flex-col gap-y-4">
                    <div class="min-h-[60px]">
                        <span class="text-sm font-bold block">Created At</span>
                        <span class="text-base">
                            {{ new Date(violation?.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) }}
                        </span>
                    </div>
                    <div class="min-h-[60px]">
                        <span class="text-sm font-bold block">Status</span>
                        <TBadge class="text-sm" color="green">Active</TBadge>
                    </div>
                </div>
            </div>

            <TButton label="Update Violation" @click="isOpen = true" icon="i-heroicons-arrow-path" size="sm"
                color="blue" variant="outline" :trailing="false" class="hover:bg-blue-50" />

            <!-- Update Modal -->
            <TModal v-model="isOpen" prevent-close>
                <TCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <div class="flex items-center justify-between w-full">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Update Violation
                            </h3>
                            <TButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="isOpen = false" />
                        </div>
                    </template>
                    <div>
                        <TForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-4">
                            <div class="flex gap-x-4 w-full pb-3">
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

                            <div class="flex justify-end pt-3">
                                <TButton type="submit" color="blue" variant="outline" block
                                    icon="i-heroicons-arrow-path" :trailing="true">
                                    Update
                                </TButton>
                            </div>
                        </TForm>
                    </div>
                </TCard>
            </TModal>

            <!-- Footer -->
            <template #footer>
                <div class="flex items-center justify-between border-t pt-4">
                    <span class="text-sm">
                        Last updated: {{ new Date(violation?.created_at).toLocaleDateString() }}
                    </span>
                    <div class="flex gap-2">
                        <TButton color="gray" variant="outline" icon="i-heroicons-arrow-left"
                            :to="{ name: 'violations-index' }" class="hover:bg-gray-100">
                            Back to List
                        </TButton>
                    </div>
                </div>
            </template>
        </TCard>
    </div>
</template>