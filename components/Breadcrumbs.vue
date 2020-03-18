<template>
    <v-breadcrumbs large v-if="hierarchy.length > 0" :items="hierarchy" class="padd" >
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState([
                'hierarchy',
            ]),
        },
    }
</script>

<style scoped>
    .padd {
        padding-top: 3px;
    }
</style>