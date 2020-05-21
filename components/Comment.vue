<template>
    <CommentTemplate avatar="36">
        <slot>
            <v-col md="9">
                <no-ssr>
                    <vue-editor
                            :options="options"
                            ref="toastUiEditor"
                            previewStyle="tab"
                            height="100px"
                            initialEditType="wysiwyg"
                            @load="disableButtons()"
                            @focus="enableButtons()"
                            @blur="disableButtons()"
                    />
                </no-ssr>
            </v-col>

            <!-- TODO: add comment after click send-->
            <v-col md="1">
                <v-btn :disabled="!commentMode" class="mx-2" fab small color="primary">
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </v-col>
        </slot>
    </CommentTemplate>

</template>

<script>

    import CommentTemplate from "./CommentTemplate";
    export default {
        components: {CommentTemplate},
        data() {
            return {
                commentMode: false,
                options :
                    {
                        hideModeSwitch: true
                    }
            }
        },
        methods: {
            disableButtons: function() {
                setTimeout(()=> {
                        this.$refs.toastUiEditor.invoke('getUI').getToolbar().disableAllButton();
                        }, 0);
                this.commentMode = false;
            },
            enableButtons: function() {
                this.$refs.toastUiEditor.invoke('getUI').getToolbar().enableAllButton();
                this.commentMode = true;


                // this.$refs.toastUiEditor.getUI().enableButtons();
            },
        },
        name: "Comment"
    }
</script>

<style>
    /*.custom-toast > div {*/
    /*    border: 1px solid #e5e5e5 !important;*/
    /*    border-radius: 10px !important;*/
    /*}*/

</style>