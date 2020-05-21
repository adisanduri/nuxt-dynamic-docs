<template>
    <div>
        <div v-for="prevComment in prevComments">
        <CommentTemplate :avatar="prevComment.avatar">
            <slot>
                <v-col md="9">
                    <v-card
                            elevation="2"
                    >
<!--                        <div class="try"></div>-->


                        <v-toolbar short dense flat color="primary">

                            <v-toolbar-title>{{prevComment.author}}</v-toolbar-title>
                            <v-spacer/>
                            {{prevComment.time}}
                        </v-toolbar>
    <!--                    <v-card-subtitle>12.03.2020 14:45</v-card-subtitle>-->
                        <v-card-text>
                            {{prevComment.content}}
                        </v-card-text>
                    </v-card>
                </v-col>
            </slot>
        </CommentTemplate>
        </div>
    </div>
</template>

<script>
    import CommentTemplate from "./CommentTemplate";
    export default {
        name: "prevComments",
        components: {CommentTemplate},
        props : {
            page: String
        },
        created: function () {
            // TODO:
            //this.prevComments = getCommentsByPage
            this.prevComments = [{
                avatar : "45",
                author: "Adi",
                time: "12.03.2020 14:45",
                content: "Hello, i think you should change...."
            },
                {
                    avatar : "81",
                    author: "Moshe",
                    time: "15.03.2020 18:40",
                    content: "Looking good!"
                }]
        }
    }
</script>

<style scoped>
.try{
    transform: translateX(-100%);

    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    border-right:10px solid blue;
}
</style>