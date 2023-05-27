
<script setup>
definePageMeta({ auth: false });
const {init,getBlogPost} = await useBlog()
await init()
const route = useRoute()
const blogpost = await getBlogPost(route.params.id)
</script>
<script>
export default {
    name: "index",
    components: {}
}
</script>

<template>
    <div>
        <h1>{{ blogpost.content }}</h1>
    </div>
</template>



<style scoped>

</style>