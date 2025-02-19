<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useViolatorModal } from '@/composables/useViolatorModal';

const ViolatorUpdateModal = defineAsyncComponent(() => import('@/pages/violators/components/View/ViolatorUpdateModal.vue'));
const ViolatorProfile = defineAsyncComponent(() => import('@/pages/violators/components/View/ViolatorProfile.vue'));
const Spinner = defineAsyncComponent(() => import('@/pages/violators/components/Assets/Spinner.vue'));

const { $api } = useNuxtApp();
const route = useRoute();
const violator = ref();
const router = useRouter();
const { isOpenUpdateViolator, openUpdateModal } = useViolatorModal();
const deleting = ref(false);

async function showViolator() {
    const response = await $api.get(`violators/${route.params.id}`);
    violator.value = response.data;
}

async function deleteViolator() {
    if (deleting.value) return;
    const confirmed = confirm('Are you sure you want to delete this violator?');
    if (!confirmed) return;
    deleting.value = true;
    try {
        await $api.delete(`violators/${route.params.id}`);
        router.push('/violators');
    } catch (error) {
        console.error('Error deleting violator:', error);
    } finally {
        deleting.value = false;
    }
}

onMounted(() => {
    showViolator();
});
</script>

<template>
    <div class="max-w-screen-sm mx-auto w-full py-6">
        <TCard class="shadow-lg border border-gray-200">
            <template #header>
                <h2 class="text-lg font-semibold text-gray-800">Violator Profile</h2>
            </template>

            <Suspense>
                <template #default>
                    <!-- <ViolatorProfile v-if="violator" :violator="violator" /> -->
                    <div class="flex items-center gap-4 p-4">
                        <TAvatar size="xl" :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                            alt="User Avatar" />
                        <div class="flex-row gap-y-10">
                            <h1 class="text-2xl font-semibold text-gray-900">{{ violator?.full_name }}</h1>
                            <p class="text-gray-600 text-xs">Gender: <span class="font-sm">{{ violator?.gender }}</span>
                            </p>
                        </div>
                    </div>
                </template>
                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>

            <template #footer>
                <div class="flex justify-end p-4">
                    <TButton color="gray" variant="outline" icon="i-heroicons-arrow-left"
                        :to="{ name: 'violators-index' }">
                        Back to List
                    </TButton>
                    <TButton color="primary" class="ml-2" variant="outline" icon="i-heroicons-pencil-square-20-solid"
                        @click="openUpdateModal">
                        Update
                    </TButton>
                    <TButton color="red" class="ml-2 flex items-center justify-center" icon="i-heroicons-trash"
                        :disabled="deleting" @click="deleteViolator">
                        <span v-if="deleting"
                            class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                        {{ deleting ? 'Deleting...' : 'Delete' }}
                    </TButton>
                </div>
            </template>
        </TCard>

        <ViolatorUpdateModal v-if="violator" :violator="violator" @update="showViolator" />
    </div>
</template>