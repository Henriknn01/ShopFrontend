
<script setup>
const props = defineProps({
    title: String,
    queryset: String,
    limit: String,
});

const {init, updateVisibleProducts, products, getProducts, scrollPrev, scrollNext, getLength, visibleProducts, pageIndex} = useCarousel(props.queryset, props.limit);


await init()


</script>

<template>
    <div class="mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-12">{{ title }}</h2>
        <div class="relative" v-if="1 > 0">
            <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 items-start overflow-hidden" style="max-width: 100%;">
                <a href="#" v-for="product in visibleProducts">
                    <div class="overflow-hidden rounded-lg bg-gray-200">
                        <img :src=product.imagesrc :alt=product.imagealt class="h-60 w-full object-cover object-center hover:opacity-75">
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }} NOK</p>
                </a>
            </div>

            <div class="absolute right-0 top-0 bottom-0 flex items-center">
                <button class="w-12 h-12 bg-transparent" @click="scrollNext" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>

            <div class="absolute left-0 top-0 bottom-0 flex items-center">
                <button class="w-12 h-12 bg-transparent" @click="scrollPrev">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Carousel',
}

</script>

<style scoped>
</style>