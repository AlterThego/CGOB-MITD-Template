<script setup lang = "ts">
    import { tickets } from './datasets/dummy';

    const PersonRow = defineAsyncComponent(() => import("./components/index-row.vue"));

    const route = useRoute();
</script>

<template>
    <div class = "custom">
        <div class = "wrapper">
            <div class = "container-fluid">
                <div class = "row">
                    <div class = "col">
                        <h1>Tickets</h1>
                        <nuxt-link :to="{ name: 'tickets-view' }">
                            Issue Ticket (Create)
                        </nuxt-link>
                        |
                        <nuxt-link>
                            Encode Ticket (TBA)
                        </nuxt-link>
                        |
                        <nuxt-link>
                            Saved Tickets (TBA)
                        </nuxt-link>
                        <hr/>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col">
                        <table class = "table table-hover table-striped">
                            <thead>
                                <tr class = "table-primary">
                                    <th class = "indicator">&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>Citation</th>
                                    <th>Violator</th>
                                    <th>Officers</th>
                                    <th>Incident</th>
                                    <th>Status</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PersonRow
                                    v-for = "ticket in tickets"
                                    v-bind:ticket = "ticket"
                                ></PersonRow>
                            </tbody>
                        </table>
                        <hr/>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col">
                        <h1>Dev. Notes</h1>
                        <ul>
                            <h6>API:</h6>
                            <li>Modified file ".env" at "./".</li>
                        </ul>
                        <ul>
                            <h6>Client:</h6>
                            <li>Modified file ".env" at "./".</li>
                            <li>Created folder "custom" at "./assets".</li>
                            <li>Added library "bootstrap.min.css" at "./assets/custom".</li>
                            <li>Created "style.css" at "./assets/custom".</li>
                            <li>Created folder "tickets" at "./pages".</li>
                            <li>Created vue "index" at "./pages/tickets".</li>
                            <li>Created vue "view" at "./pages/tickets".</li>
                            <li>Created vue "update" at "./pages/tickets".</li>
                            <li>Created vue "delete" at "./pages/tickets".</li>
                            <li>Created folder "components" at "./pages/tickets".</li>
                            <li>Created vue "index-row" at "./pages/tickets/components".</li>
                            <li>Modified file "index.ts" at "./routes".</li>
                            <li>Created folder "datasets" at "./pages/tickets".</li>
                            <li>Created typescript "dummy" at "./pages/tickets/datasets".</li>
                        </ul>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    @import url("~/assets/custom/bootstrap.min.css");
    @import url("~/assets/custom/style.css");

    .indicator {
        padding: 0 !important;
        width: 5px !important;
    }
    .indicator.active {
        background-color: greenyellow !important;
        width: 0;
    }
    .indicator.pending {
        background-color: orange !important;
        width: 0;
    }
    .indicator.disposed {
        background-color: red !important;
        width: 0;
    }

    .status > span {
        border: 2px solid;
        border-radius: 50px;
        padding: 10px 20px;
    }
    .status.active > span {
        border-color: greenyellow;
    }
    .status.pending > span {
        border-color: orange;
    }
    .status.disposed > span {
        border-color: red;
    }
</style>