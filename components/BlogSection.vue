<script setup>
const {init, visiblePosts} = await useBlog()
await init()
</script>

<template>
    <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Learn more about the latest news from Wave</p>
    </div>
    <div class="mx-auto my-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="(item, index) in visiblePosts" :key="index" class="flex max-w-xl flex-col items-start">
            <div class="flex items-center gap-x-4 text-xs">
                <time :datetime="item.date" class="text-gray-500">{{ item.date }}</time>
            </div>
            <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a :href="/blog/ + item.id">
                        <span class="absolute inset-0"></span>
                        {{ item.title }}
                    </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ item.content }}</p>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: "BlogSection"
}
</script>

<style scoped>

</style>