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

import { z } from 'zod'

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

function updateTicket() {
    $api.put(`tickets/${route.params.id}`)
    // .then((response) => {
    //     ticket.value = response.data
    // })

    toast.add({
        title: 'Success',
        description: 'The ticket was updated successfully.',
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


const form = reactive({
    citation_number: '',
    status: '',
    violator: {
        first_name: '',
        middle_name: '',
        last_name: '',
        gender_id: ''
    }
})

// UpdateTicketModal
const isOpenUpdateTicket = ref(false);

// Citation number max values
const maxCitationNumberLength = 13;


const ticketSchema = z.object({
    citation_number: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, "Invalid citation number format is 123-4567-8910"),
    first_name: z.string(),
    violator: z.object({
        first_name: z.string(),
        middle_name: z.string().optional(), 
        last_name: z.string().optional(),
        gender_id: z.number(),
    }),
 
    status: z.string().min(1)
});

type TicketSchema = z.output<typeof ticketSchema>

// Genders
const genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'LGBTQQIP2SAA' },
    { id: 4, name: 'Attack Helicopter' },
]

// Ticket statuses
const statuses = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Disposed' },
]

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
                    <TButton color="primary" variant="outline" icon="i-heroicons-pencil-square-20-solid"
                        @click="isOpenUpdateTicket = true">
                        Update
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

        <TModal v-model="isOpenUpdateTicket" prevent-close>
            <TCard
                :ui="{ base: 'h-full flex flex-col', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <div clas="border-b border">
                    <div class="flex items-center justify-between border-b pb-2">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Update Ticket
                        </h3>
                        <TButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenUpdateTicket = false" />
                    </div>
                </div>


                <TForm :schema="ticketSchema" :state="form" class="space-y-4z">

                    <div class="flex-row">
                        <div class="flex justify-between gap-x-4 mb-6 mt-3">
                            <TFormGroup class="basis-2/3  w-full" label="Citation Number" name="citation_number">
                                <TInput :maxlength="maxCitationNumberLength" class="w-full" placeholder="123-4567-8910"
                                    autocomplete="off" v-bind:model-value="ticket?.citation_number" />
                            </TFormGroup>
                            <TFormGroup class="basis-1/3 w-full" label="Status" name="status">
                                <TInputMenu v-bind:model-value="ticket?.status" :options="statuses" placeholder="Set the status"
                                    by="id" option-attribute="name" :search-attributes="['name']"
                                    @update:modelValue="(selected) => form.status = selected ? String(selected.name) : ''">
                                </TInputMenu>
                            </TFormGroup>
                        </div>

                        <!-- Removed property name="" for now -->
                        <div class="flex justify-between gap-x-4 mb-6" name="first_name">
                            <TFormGroup class="w-full" label="First Name">
                                <TInput v-bind:model-value="ticket?.violator.first_name" class="w-full" placeholder="John"
                                    autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup class="w-full" label="Middle Name">
                                <TInput v-bind:model-value="ticket?.violator.middle_name" class="w-full" placeholder="Michael"
                                    autocomplete="off" />
                            </TFormGroup>
                        </div>

                        <div class="flex justify-between gap-x-4 mb-6">
                            <TFormGroup class="w-full" label="Last Name" name="last_name">
                                <TInput v-bind:model-value="ticket?.violator.last_name" class="w-full" placeholder="Doe"
                                    autocomplete="off" />
                            </TFormGroup>
                            <TFormGroup class="w-full" label="Gender">
                                <TInputMenu v-bind:model-value="ticket?.violator.gender" :options="genders"
                                    placeholder="Select a gender" by="id" option-attribute="name"
                                    :search-attributes="['name']"
                                    @update:modelValue="(selected) => form.violator.gender_id = selected ? selected.id : null">
                                </TInputMenu>
                            </TFormGroup>
                        </div>
                    </div>
                    <TButton type="submit" @click="updateTicket">
                        Submit
                    </TButton>
                </TForm>

            </TCard>
        </TModal>
    </div>
</template>