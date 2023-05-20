
<script setup>
const {init, getTotalLength, pageSize, getPageIndex, blogPosts, nextPage, prevPage, goToPage, visiblePosts, getPageNumberRender} = await useBlog()
await init()
let totalLength = getTotalLength()

</script>
<script>
export default {
    name: "blog"
}
</script>

<template>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow grid grid-cols-1 gap-16 content-center my-12">
        <h1 class="text-6xl font-bold mx-12">Blog Posts</h1>
        <div v-for="post in visiblePosts" :key="post.id" class="rounded-lg shadow-lg max-h-fit overflow-hidden mx-12">
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
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ getPageIndex() + 1 }}</span>
                    to
                    <span class="font-medium">{{ getPageIndex() + pageSize}}</span>
                    of
                    <span class="font-medium">{{ totalLength }}</span>
                    results
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" @click="prevPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Previous</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a
                        v-for="item in getPageNumberRender()"
                        :key="item.id"
                        :href="item.link"
                        :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold',{
                            'bg-indigo-600 text-white': item.isActive,
                            'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0': !item.isActive,
                            },]" @click="goToPage(item.id)">
                        {{ item.label }}
                    </a>
                    <a href="#" @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Next</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>