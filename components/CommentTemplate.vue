<template>
    <v-row>
        <v-col md="8" class="pa-0">
            <v-row align="center">
                <v-col md="1">
                    <v-avatar color="indigo" size="42">
                        <!-- TODO : INSERT IMAGE INSTEAD-->
                        <span class="white--text headline">{{avatar}}</span>

                    </v-avatar>
                </v-col>
                <slot/>

            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "CommentTemplate",
        props: {
            avatar: String
        }
    }
</script>

<style scoped>

</style>