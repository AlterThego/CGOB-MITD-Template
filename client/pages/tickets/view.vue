<script setup lang="ts">

// import { tickets } from './datasets/dummy';
// const ticket = computed(() => {
//     return tickets.find(ticket => ticket.id == parseInt(route.params.id as string));
// });

import { TAvatar, TButton } from '#components';

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const ticket = ref();
const toast = useToast()

const avatarSeed = computed(() => {
    return ticket.value?.violator.first_name.replaceAll(' ', '+');
});

function useDeleteToast() {
    toast.add({
        title: 'Success',
        description: 'The ticket was deleted successfully.',
    })
}

function showTicket() {
    $api.get(`tickets/${route.params.id}`)
        .then((response) => {
            ticket.value = response.data
        })
}

function deleteTicket() {
    $api.delete(`tickets/${route.params.id}`)
        .then(() => {
            useDeleteToast()
            router.push('/tickets')
        })
}

onMounted(() => {
    showTicket()
})
</script>




<!-- <template>
    <div class="custom">
        <div class="wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <h1>Ticket Details</h1>
                        <span class="bold">ID No. </span>{{ ticket?.id }}
                        |
                        <span class="bold">Citation No. </span>{{ ticket?.citation_number }}
                        <hr />
                        <br />
                        <br />
                        <nuxt-link :to="{ name: 'tickets-index' }">
                            Return To Index
                        </nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <img v-bind:src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`" alt=""
                            srcset="" class="aspect-square w-32 h-32" />
                        <ul>
                            <h1>Ticket details:</h1>
                            <li>ID: {{ ticket?.id }}</li>
                            <li>Citation Number: {{ ticket?.citation_number }}</li>
                            <li>Status: {{ ticket?.status }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> -->


<template>
    <div class="max-w-screen-sm mx-auto w-full py-6">
        <TCard class="shadow-lg border border-gray-200">
            <template #header>
                <h2 class="text-lg font-semibold text-gray-800">Violation Ticket</h2>
            </template>

            <div class="flex items-center gap-4 p-4">
                <!-- User Avatar -->
                <TAvatar size="xl" :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                    alt="User Avatar" />

                <!-- Ticket Information -->
                <div class="flex-row gap-y-10">
                    <p class="text-gray-600 text-xs">Ticket ID: <span class="font-medium">{{ ticket?.id }}</span></p>

                    <h1 class="text-2xl font-semibold text-gray-900">{{ ticket?.violator.full_name }}</h1>

                    <p class="text-gray-600 text-xs">Gender: <span class="font-sm">{{
                        ticket?.violator.gender
                            }}</span></p>
                    <p class="text-gray-600 text-sm">Citation Number: <span class="font-bold">{{
                        ticket?.citation_number
                            }}</span></p>
                    <p class="text-red-500 text-sm font-semibold"> {{ ticket?.status }}</p>
                </div>
            </div>

            <template #footer>
                <div class="flex items-center gap-3 justify-center py-3">
                    <TButton color="gray" variant="outline" icon="i-heroicons-arrow-left"
                        :to="{ name: 'tickets-index' }">
                        Back to List
                    </TButton>
                    <TButton color="red" icon="i-heroicons-trash" @click="deleteTicket">
                        Delete
                    </TButton>
                    <TButton color="gray" variant="outline" icon="i-heroicons-archive-box" :disabled="true">
                        Restore
                    </TButton>
                </div>
            </template>
        </TCard>
    </div>
</template>