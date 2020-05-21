<template>
    <div>
        <v-col md="12">
            <v-divider />
        </v-col>

        <prevComments />
        <comment />
    </div>
</template>

<script>
    import Comment from "./Comment";
    import PrevComments from "./PrevComments";


    export default {
        components: {Comment, PrevComments},
        name: "Comments"
    }
</script>

<style scoped>

</style>