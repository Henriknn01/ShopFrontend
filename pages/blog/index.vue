<template>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow grid grid-cols-1 gap-16 content-center my-12">
        <h1 class="text-6xl font-bold mx-12">Blog posts</h1>
        <div v-for="post in blogposts" :key="post.id" class="rounded-lg shadow-lg max-h-fit overflow-hidden mx-12">
            <div class="overflow-hidden rounded-lg h-96 bg-cover bg-center" :style="{backgroundImage: `url(${post.imageUrl})`}">
            </div>
            <div class="m-6">
                <h1 class="text-4xl font-semibold mb-4">{{ post.title }}</h1>
                <p class="text-xl ">{{ post.content }}</p>
            </div>
            <div class="flex items-center flex-row m-6 inline">
                <div class="flex-1">
                    <h3><span class="font-light">Author:</span> {{ post.author }}</h3>
                </div>
                <div class="flex-1 text-center">
                    <h3>{{ new Date(post.date).toLocaleDateString() }}</h3>
                </div>
                <div class="flex-1 text-right">
                    <a :href="'/blog/' + post.id" class="rounded bg-blue-500 text-white p-2 hover:bg-blue-400">Read More</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const blogposts = await useBlog()
</script>
<script>
export default {
  name: "blog"
}
</script>

<style scoped>

</style>