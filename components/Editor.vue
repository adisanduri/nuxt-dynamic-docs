<template>
    <markdown-editor :options="options"></markdown-editor>
</template>

<script>
    import { mapState , mapMutations} from 'vuex';
    export default {
        computed: {
            ...mapState([
            ]),
        },
        data () {
        return {
            options: {
                lineNumbers: true,
                styleActiveLine: true,
                styleSelectedText: true,
                lineWrapping: true,
                indentWithTabs: true,
                tabSize: 2,
                indentUnit: 2
            }
        }
    },
    }
</script>

<style scoped>

</style>