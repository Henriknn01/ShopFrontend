<script setup>
import useCategoryCard from "../composables/useCategoryCard";

const props = defineProps({
    title: String,
    parent: String,
});


let {data: data } = await useFetch(process.env.BACKEND_API_URL + `/productcategory/?parent_category=` + props.parent)

const items = await useCategoryCard(data, props.parent)

</script>

<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-6 sm:py-12 lg:max-w-none lg:py-22">
            <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>

            <div class="mt-0 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                <div v-for="item in items" :key="item.id" class="group relative">
                    <div class="mt-6 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img :src="item.imagesrc" :alt="item.imagealt" class="h-full w-full object-cover object-center"/>
                    </div>
                    <h3 class="mt-2 text-sm text-gray-500">
                        <a :href="'/categories/' + item.id">
                            <span class="absolute inset-0"></span>
                            {{ item.name }}
                        </a>
                    </h3>
                    <p class="text-base font-semibold text-gray-900">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "categoryCard"
}
</script>

<style scoped>

</style>