<template>
    <div>
        <v-tooltip bottom key="action.id" v-for="action in actions">
            <template v-slot:activator="{ on }">
                <v-btn icon
                       v-on="on"
                       :color="action.selected ? action.color : 'gray'"
                       @click="action.click(); action.selected=!action.selected"
                >
                    <v-icon>{{action.icon}}</v-icon>
                </v-btn>
            </template>
            <span>{{action.tooltip}}</span>

        </v-tooltip>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>

                <v-card-text>
                    Your changes will not save
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Stay here
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false; toggleEditMode()"
                    >
                        Continue without saving
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'editMode',
            ])
        },
        methods: {
            ...mapMutations(['toggleEditMode',
            ])
        },
        watch: {
            editMode: function() {
                if (!this.$store.state.editMode) {
                    this.actions[0].selected = false;
                }
            }
        },
        mounted() {
            this.actions = [
                {
                    id: "1",
                    icon: "mdi-pencil",
                    selected: false,
                    click: this.toggleEditMode,
                    color: 'blue',
                    tooltip: 'edit'
                },
                {
                    id: "2",
                    icon: "mdi-star",
                    selected: false,
                    click: function () {

                    },
                    color: 'yellow',
                    tooltip: 'favorite'
                },
                {
                    id: "3",
                    icon: "mdi-eye",
                    selected: false,
                    click: function () {

                    },
                    color: 'blue',
                    tooltip: 'follow'
                },
                {
                    id: "4",
                    icon: "mdi-history",
                    selected: false,
                    click: function () {

                        // TODO :
                        if (this.editMode) {
                            this.dialog = true;
                        }
                    },
                    color: 'blue',
                    tooltip: 'history'
                },
            ]
        },
        data () {
            return {
                actions: [],
                dialog: false
            }
        }
    }
</script>

<style>

</style>