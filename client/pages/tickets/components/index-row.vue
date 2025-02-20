<script setup lang = "ts">
    const props = defineProps({
        ticket: {
            type: Object as PropType<{
                id: number,
                citation_number: string,
                status: string,
                violator: {
                    first_name: string,
                    middle_name: string,
                    last_name: string,
                    gender: {
                        name: string,
                        description: string,
                    },
                }
            }>,
        },
    });
    const avatarSeed = computed(() => {
        return props.ticket?.violator.first_name.replaceAll(' ', '+');
    });
</script>

<template>
    <tr>
        <td
            class = "indicator"
            v-bind:class = "(ticket?.status == 'Active') ? 'active' : (ticket?.status == 'Pending') ? 'pending' : (ticket?.status == 'Disposed') ? 'disposed' : 'disposed'"
        ></td>
        <td class = "align-middle d-flex justify-content-center">
            <img
                v-bind:src = "`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                alt = ""
                srcset = ""
                class = "aspect-square w-16 h-16"
            />
        </td>
        <td>
            <span class = "bold">No. </span>{{ ticket?.citation_number }}
            <br/>
            <span class = "bold">Desc. </span>N/A
            <br/>
            <span class = "bold">Cat. </span>N/A
        </td>
        <td>
            <span class = "bold">Name: </span>{{ ticket?.violator.first_name }} {{ ticket?.violator.middle_name }} {{ ticket?.violator.last_name }}
            <br/>
            <span class = "bold">Address: </span>N/A
        </td>
        <td>
            <span class = "bold">Apprehending: </span>N/A
            <br/>
            <span class = "bold">Encoding: </span>N/A
        </td>
        <td>
            <span class = "bold">Location: </span>N/A
            <br/>
            <span class = "bold">Time: </span>N/A
        </td>
        <td
            class = "align-middle text-center status"
            v-bind:class = "(ticket?.status == 'Active') ? 'active' : (ticket?.status == 'Pending') ? 'pending' : (ticket?.status == 'Disposed') ? 'disposed' : 'disposed'"
        >
            <span>{{ ticket?.status }}</span>
        </td>
        <td class = "align-middle text-center">
            <nuxt-link
                v-bind:to = "{ name: 'tickets-view', params: { id: ticket?.id }}"
                class = "btn btn-primary"
            >
                Manage
            </nuxt-link>
        </td>
    </tr>
</template>