<script setup lang="ts">
import { useRouter } from 'vue-router';
const { $api } = useNuxtApp();

const route = useRoute();
const router = useRouter();
const violation = ref();
const toast = useToast()

// Show violation function
function showViolation() {
    $api.get(`violations/${route.params.id}`)
        .then((response) => {
            violation.value = response.data
        })
}
// Mount violation to showViolation
onMounted(() => {
    showViolation()
})

// Delete violation function
function deleteViolation() {
    $api.delete(`violations/${route.params.id}`)
        .then(() => {
            toast.add({
                title: 'Success',
                description: 'The ticket was deleted successfully.',
            })
            router.push({ name: 'violations-index' });
        })
}

// Restore violation function
function restoreViolation() {
    $api.patch(`violations/${route.params.id}`)
        .then(() => {
            toast.add({
                title: 'Success',
                description: 'The ticket was restored successfully.',
            })
            router.push({ name: 'violations-index' });
        })
}

const UpdateModal = defineAsyncComponent(() =>
    import('@/components/violations/update-modal.vue')
)

</script>

<template>
    <div class="max-w-screen-lg mx-auto p-6">
        <TCard class="border border-gray-200">
            <!-- Header -->
            <template #header>
                <div class="flex items-center justify-between border-b border-gray-200 pb-4 w-full">
                    <div class="flex items-center gap-x-4">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Violation Record
                        </h3>
                        <TBadge color="primary" class="text-sm">
                            ID: {{ violation?.id }}
                        </TBadge>
                    </div>

                    <div class="flex items-center gap-x-4">
                        <UpdateModal />
                        <TButton v-if="!violation?.deleted_at" label="Delete" icon="i-heroicons-trash-20-solid"
                            color="red" variant="outline" @click="deleteViolation()" />

                        <TButton v-else label="Restore" icon="i-heroicons-arrow-path-20-solid" color="blue"
                            variant="outline" @click="restoreViolation()" />

                    </div>
                </div>
            </template>

            <!-- Main Content -->
            <div class="grid grid-cols-3 gap-8 py-4">
                <!-- Left Column -->
                <div class="space-y-4 w-full">
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Name</span>
                        <span class="text-base text-gray-900">{{ violation?.name }}</span>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Penalty</span>
                        <span class="text-base text-gray-900">{{ violation?.penalty }}</span>
                    </div>
                </div>

                <!-- Middle Column -->
                <div class="space-y-4 w-full">
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Ordinance</span>
                        <span class="text-base text-gray-900">{{ violation?.ordinance }}</span>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Fine Amount</span>
                        <span class="text-base font-semibold text-primary">₱{{ violation?.fine }}</span>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-4 w-full">
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Created At</span>
                        <span class="text-base text-gray-900">
                            {{ new Date(violation?.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) }}
                        </span>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-500 block mb-1">Status</span>
                        <TBadge class="text-sm" :class="violation?.deleted_at ? 'bg-red-500' : 'bg-green-500'">
                            {{ violation?.deleted_at ? 'Disposed' : 'Active' }}
                        </TBadge>


                    </div>
                </div>
            </div>

            <!-- Footer -->
            <template #footer>
                <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span class="text-sm text-gray-500">Last updated: {{ new
                        Date(violation?.created_at).toLocaleDateString() }}</span>
                    <div class="flex gap-2">
                        <TButton color="gray" variant="outline" icon="i-heroicons-arrow-left"
                            :to="{ name: 'violations-index' }">
                            Back to List
                        </TButton>
                    </div>
                </div>
            </template>
        </TCard>
    </div>
</template>