<template>
    <div>
        <h1>{{title}}</h1>
        <no-ssr>

            <div v-if="editMode">
                <vue-editor
                        ref="tuiEditor"
                        :initialValue="content"
                        previewStyle="tab"
                        height="300px"
                        initialEditType="wysiwyg"
                />
                <v-btn @click="save()">save</v-btn>
            </div>
            <div v-else v-html="content">
                {{content}}
            </div>

        </no-ssr>

    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex";

    export default {
        computed: {
            ...mapState([
                'selectedRoute',
                'editMode',
                'content',
            ]),
        },
        created()  {
            this.getTitle();
            this.$store.watch(
                (state) => state.selectedRoute,
                () => { this.getTitle() }
            )
        },
        methods: {
            ...mapMutations([
                'setContent',
                'toggleEditMode'
                ]),
            save() {
                this.setContent(this.$refs.tuiEditor.invoke('getHtml'));
                this.toggleEditMode();
            },
            async getTitle(){
                if (this.selectedRoute != '/') {
                    var splitResults = this.selectedRoute.split("/");
                    if (splitResults[splitResults.length - 1] == 'index') {

                        if (splitResults.length >= 2)
                            this.title = splitResults[splitResults.length - 2];
                    } else {
                        this.title = splitResults[splitResults.length - 1];
                    }
                }
            }
        },
        data () {
            return {
                title: '',
                editorText: 'This is initialValue.!',

            }
        }
    }
</script>

<style scoped>

</style>