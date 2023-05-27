<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const {data: productList, pending, error, refresh} = useFetch(
    config.public.BACKEND_API_URL + '/productlist/' + route.params.id + '/'
);
</script>

<template>
  <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8" >
      <div v-if="pending">
          <h2>loading data...</h2>
      </div>
      <div v-else-if="error">
          {{error}}
      </div>
      <div v-else>
          <img class="w-full h-64 rounded-lg object-cover object-center" :src="(productList.image.length>0 ? productList.image[0].src : '')">
          <h1 class="text-3xl font-bold text-gray-900 my-6">{{ productList.name }}</h1>
          <hr>
          <div class="grid grid-cols-4 gap-4 auto-rows-auto my-12">
              <a :href="'/product/' + product.id" v-for="product in productList.products">
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
    name: "[id]"
}
</script>

<style scoped>

</style>