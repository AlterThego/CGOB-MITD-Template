<script setup lang = "ts">
    // Meta
    import { TAvatar, TButton } from '#components';

    const { $api } = useNuxtApp();
    const route = useRoute();
    const router = useRouter();
    const ticket = ref();
    const toast = useToast()

    // Tickets
    function ticketFetch() {
        $api.get(`tickets/${route.params.id}`)
            .then((response) => {
                ticket.value = response.data;
            });
    }

    function deleteTicket() {
        $api.delete(`tickets/${route.params.id}`)
            .then(() => {
                router.push('/tickets');
                toast.add({
                    title: 'Success',
                    description: 'The ticket was deleted successfully.',
                });
            });
    }

    onMounted(() => {
        ticketFetch();
    });

    // Avatar
    const avatarSeed = computed(() => {
        return ticket.value?.violator.first_name.replaceAll(' ', '+');
    });
</script>

<template>
    <div class = "max-w-screen-sm mx-auto w-full py-6">
        <TCard class = "shadow-lg border border-gray-200">
            <template #header>
                <h2 class = "text-lg font-semibold text-gray-800">Violation Ticket</h2>
            </template>
            <div class = "flex items-center gap-4 p-4">
                <!-- User avatar -->
                <TAvatar
                    size = "xl"
                    alt="User Avatar"
                    :src = "`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                />
                <!-- Ticket information -->
                <div class = "flex-row gap-y-10">
                    <p class = "text-gray-600 text-xs">Ticket ID: <span class = "font-medium">{{ ticket?.id }}</span></p>
                    <h1 class = "text-2xl font-semibold text-gray-900">{{ ticket?.violator.full_name }}</h1>
                    <p class = "text-gray-600 text-xs">Gender: <span class = "font-sm">{{ ticket?.violator.gender}}</span></p>
                    <p class = "text-gray-600 text-sm">Citation Number: <span class = "font-bold">{{ ticket?.citation_number }}</span></p>
                    <p class = "text-red-500 text-sm font-semibold">{{ ticket?.status }}</p>
                </div>
            </div>
            <template #footer>
                <div class = "flex items-center gap-3 justify-center py-3">
                    <TButton
                        color = "gray"
                        variant = "outline"
                        icon = "i-heroicons-arrow-left"
                        :to = "{ name: 'tickets-index' }"
                    >
                        Back to List
                    </TButton>
                    <TButton
                        color = "red"
                        icon = "i-heroicons-trash"
                        @click = "deleteTicket"
                    >
                        Delete
                    </TButton>
                    <TButton
                        color = "gray"
                        variant = "outline"
                        icon = "i-heroicons-archive-box"
                        :disabled = "true"
                    >
                        Restore
                    </TButton>
                </div>
            </template>
        </TCard>
    </div>
</template>