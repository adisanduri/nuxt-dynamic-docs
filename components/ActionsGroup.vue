<template>
    <div>
        <v-btn icon
               v-for="action in actions">
            <v-icon @click="action.click()">{{action.icon}}</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        methods: {
            ...mapMutations(['toggleEditMode',
            ])
        },
        mounted() {
            this.actions = [
                {
                    id: "1",
                    icon: "mdi-pencil",
                    click: this.toggleEditMode
                },
                {
                    id: "2",
                    icon: "mdi-heart",
                    click: function () {

                    }
                },
                {
                    id: "3",
                    icon: "mdi-eye",
                    click: function () {

                    }
                },
                {
                    id: "4",
                    icon: "mdi-history",
                    click: function () {

                    }
                },{
                    id: "5",
                    icon: "mdi-thumb-up",
                    click: function () {

                    }
                },{
                    id: "6",
                    icon: "mdi-thumb-down",
                    click: function () {

                    }
                }
            ]
        },
        data () {
            return {
                actions: []
            }
        }
    }
</script>

<style scoped>

</style>