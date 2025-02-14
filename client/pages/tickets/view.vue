<script setup lang = "ts">
    import { tickets } from './datasets/dummy';

    const route = useRoute();

    const ticket = computed(() => {
        return tickets.find(ticket => ticket.id == parseInt(route.params.id as string));
    });
    const avatarSeed = computed(() => {
        return ticket.value?.violator.first_name.replaceAll(' ', '+');
    });
</script>

<template>
    <div class = "custom">
        <div class = "wrapper">
            <div class = "container-fluid">
                <div class = "row">
                    <div class = "col">
                        <h1>Ticket Details</h1>
                        <span class = "bold">ID No. </span>{{ ticket?.id }}
                        |
                        <span class = "bold">Citation No. </span>{{ ticket?.citation_number }}
                        <hr/>
                        <br/>
                        <br/>
                        <nuxt-link :to="{ name: 'tickets-index' }">
                            Return To Index
                        </nuxt-link>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-3">
                        <img
                            v-bind:src = "`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`"
                            alt = ""
                            srcset = ""
                            class = "aspect-square w-32 h-32"
                        />
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
</template>

<style>
    @import url("~/assets/custom/bootstrap.min.css");
    @import url("~/assets/custom/style.css");
</style>