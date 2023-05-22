<script setup>
const route = useRoute()
const id = route.params.id

const config = useRuntimeConfig();

const {data:products, pending, error, refresh} = await useFetch(config.public.BACKEND_API_URL + '/product/?format=json&category=' + id);
</script>

<template>
    <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <category-card title="Categories" :parent="id"/>
        <div>
            <h2 class="font-bold text-3xl mb-8">Products</h2>
            <div class="grid grid-cols-6 gap-4 auto-rows-auto">
                <a :href="'/product/' + product.id" v-for="product in products">
                    <div class="overflow-hidden rounded-lg bg-gray-200">
                        <img :src="(product.image.length>0 ? product.image[0].src : '')" :alt="(product.image.length>0 ? product.image[0].alt : '')" class="w-full h-44 object-cover object-center hover:opacity-75">
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }} NOK</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>