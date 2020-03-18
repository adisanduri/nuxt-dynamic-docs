<template>
    <v-row>
        <Breadcrumbs />
        <div class="flex-grow-1"></div>
        <ActionsGroup />
    </v-row>
</template>

<script>
    import {mapState} from "vuex";

    import ActionsGroup from "./ActionsGroup";
    import Breadcrumbs from "./Breadcrumbs";

    export default {
        components: {Breadcrumbs, ActionsGroup},
        computed: {
            ...mapState([
                'editMode',
            ]),
        }
    }
</script>

<style scoped>

</style>