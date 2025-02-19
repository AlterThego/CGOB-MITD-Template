```vue project="Vue Project" file="pages/violators/view.vue" type="vue"
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ViolatorUpdateModal from '@/components/violators/View/ViolatorUpdateModal.vue';
import { useViolatorModal } from '@/composables/useViolatorModal';

const { $api } = useNuxtApp();
const route = useRoute();
const violator = ref();
const router = useRouter();
const { isOpenUpdateViolator, openUpdateModal } = useViolatorModal();
const loading = ref(true);
const deleting = ref(false);

const avatarSeed = computed(() => {
    return violator.value?.first_name.replaceAll(' ', '+');
});

async function showViolator() {
    loading.value = true;
    try {
        const response = await $api.get(`violators/${route.params.id}`);
        violator.value = response.data;
    } catch (error) {
        console.error('Error fetching violator:', error);
    } finally {
        loading.value = false;
    }
}

async function deleteViolator() {
    if (deleting.value) return;
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

            <div v-if="loading" class="flex justify-center py-10">
                <span v-if="loading"
                    class="animate-spin border-4 border-black border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            </div>

            <div v-else class="flex items-center gap-4 p-4">
                <TAvatar size="xl" :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                    alt="User Avatar" />
                <div class="flex-row gap-y-10">
                    <h1 class="text-2xl font-semibold text-gray-900">{{ violator?.full_name }}</h1>
                    <p class="text-gray-600 text-xs">Gender: <span class="font-sm">{{ violator?.gender }}</span></p>
                </div>
            </div>

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
                    <TButton color="red" class="ml-2 flex items-center justify-center" :disabled="deleting"
                        @click="deleteViolator">
                        <span v-if="deleting"
                            class="animate-spin border-4 border-black border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                        {{ deleting ? 'Deleting...' : 'Delete' }}
                    </TButton>
                </div>
            </template>
        </TCard>

        <ViolatorUpdateModal v-if="violator" :violator="violator" @update="showViolator" />
    </div>
</template>