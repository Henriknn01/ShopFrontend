<script setup>
const props = defineProps({
    title: String,
    parent: String,
});
const items = ref([]);
const config = useRuntimeConfig();
let parent = props.parent
try {
    let {data: categories } = await useFetch(config.public.BACKEND_API_URL + `/productcategory/?parent_category=` + props.parent)
    if (props.parent === "") {
        parent = null
    }
    for (const category of await categories.value) {
        if (category.parent_category === parent)  {
            if (category.image === null) {
            items.value.push({
                id: category.id,
                name: category.name,
                imagesrc: null,
                imagealt: null,
                desc: category.desc,
                parent_category: category.parent_category,
            });
        } else {
            items.value.push({
                id: category.id,
                name: category.name,
                imagesrc: category["image"].src,
                imagealt: category["image"].alt,
                desc: category.desc,
                parent_category: category.parent_category,
            });
        }
        }
    }
} catch (e) {
    console.warn(e)
}

</script>

<template>
    <div>
        <div class="mx-auto max-w-2xl pb-3 sm:pb-6 lg:max-w-none lg:py-22">
            <h2 class="text-3xl font-bold text-gray-900">{{ title }}</h2>

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