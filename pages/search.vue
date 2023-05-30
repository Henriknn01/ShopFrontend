<script setup>
import {ref} from "vue";

let config = useRuntimeConfig();

const searchField = ref('');

const {data: products, pending, error, refresh} = await useFetch(config.public.BACKEND_API_URL + `/product/`,
{
        params: {
            search: searchField,
        },
        watch: [searchField],
    }
);

definePageMeta({ auth: false });

</script>

<template>
    <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">

        <div class="gap-4 text-center">
            <label for="search" class="font-semibold hidden" aria-hidden="true">Search</label><br>
            <input id="search" v-model="searchField" type="text" class="w-2/3 p-2.5 bg-gray-100 shadow-inner rounded" placeholder="Search">
        </div>
        <hr class="my-8">
        <div class="text-center my-4" v-if="pending">
            Loading...
        </div>
        <div class="text-center my-4" v-if="error">
            {{error}}
        </div>
        <div class="grid md:grid-cols-6 grid-cols-2 gap-4 auto-rows-auto" v-else>
            <a :href="'/product/' + product.id" v-for="product in products">
                <div class="overflow-hidden rounded-lg bg-gray-200">
                    <img :src="(product.image.length>0 ? product.image[0].src : '')" :alt="(product.image.length>0 ? product.image[0].alt : '')" class="w-full h-44 object-cover object-center hover:opacity-75">
                </div>
                <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }} NOK</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "search"
}
</script>

<style scoped>

</style>