<template>
    <v-layout
            column
            justify-center
            align-center
    >
        <v-flex
                xs12
                sm8
                md6
        >
            <div class="content" v-html="pageResult.html"></div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        async asyncData({ params }) {
            try {
                console.log("-------------------------------------------------")
                console.log("-------------------------------------------------")
                console.log(`~/content/${params.category}/${params.subCategory}/${params.subSubCategory}/${params.subSubSlug}.md`)
                let pageResult = await import(`~/content/${params.category}/${params.subCategory}/${params.subSubCategory}/${params.subSubSlug}.md`);
                return {
                    pageResult: pageResult
                }
            } catch(err) {
                console.debug(err)
                return false
            }
        },
        name: 'subSlug.vue'
    }
</script>

<style scoped>

</style>