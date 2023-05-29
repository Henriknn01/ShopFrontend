<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import Reviews from "../../components/reviews.vue";
const route = useRoute();
const config = useRuntimeConfig();
definePageMeta({ auth: false });
const { data: product, pending, error, refresh } = await useFetch(config.public.BACKEND_API_URL + "/product/" + route.params.id+"/");
const cart = useShoppingCartStore()
const { getAverage } = useReviews();

const prod = ref(await product)

useHead({
    meta: [
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: prod.value.name },
        { hid: 'og-desc', property: 'og:description', content: prod.value.desc },
        { hid: 'og-image', property: 'og:image', content: (prod.value.image.length > 0 ? prod.value.image[0].src : '')},

    ]
})
function addToCart(item) {
    let i = {
        id: item.id,
        name: item.name,
        desc: item.desc,
        img: (item.image.length>0 ? item.image[0].src : ""),
        imgAlt: (item.image.length>0 ? item.image[0].alt : "no image"),
        price: item.price,
        quantity: 1,
        link: route.fullPath
    }
    cart.addItem(i)
}

const selectedImage = ref({src: "", alt: "no image"});
function setSelectedImage(imgSrc, imgAlt) {
    selectedImage.value = {src: imgSrc, alt: imgAlt};
}
const p = await product;
const avg = ref(0);
if (p.value) {
    avg.value = await getAverage(route.params.id);
    if (p.value.image.length > 0) {
        setSelectedImage(p.value.image[0].src, p.value.image[0].alt);
    }
}
const {init, visiblePosts} = await useBlog()
await init()
</script>

<template>
    <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8" >
        <div v-if="pending">
            <h1>Loading...</h1>
        </div>
        <div v-else-if="error" class="my-48 text-center">
            <h1 class="text-3xl font-bold">{{error.statusCode}} {{error.statusMessage}}</h1>
        </div>
        <div v-else>
            <div class="grid grid-cols-12 auto-rows-auto gap-12">
                <div class="col-span-12 md:col-span-6 h-screen">
                    <img class="w-full rounded-lg h-2/3 object-cover object-center" v-bind:src="selectedImage.src" v-bind:alt="selectedImage.alt"/>
                    <div class="grid grid-cols-4 gap-4 mt-6">
                        <img class="h-32 w-full rounded-lg object-cover object-center cursor-pointer" v-for="image in product.image" :src="image.src" :alt="image.alt" @click="setSelectedImage(image.src, image.alt)"/>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="flex inline-flex items-center w-full mb-4">
                        <div class="flex-1">
                            <h1 class="font-bold text-2xl">{{ product.name }}</h1>
                        </div>
                        <div class="flex-none">
                            <StarIcon class="h-6 w-6 text-yellow-500 mx-auto" />
                            <h3 class="text-gray-600 mx-10">{{ avg }}</h3>
                        </div>
                    </div>
                    <h2 class="font-semibold text-xl mb-6">{{ product.price }} kr</h2>
                    <label>Description</label>
                    <p class="text-gray-500 mt-2">
                        {{ product.desc }}
                    </p>
                    <p class="font-light text-sm mt-4">SKU: {{ product.sku }}</p>
                    <button class="p-4 bg-indigo-600 rounded-lg text-white w-full my-6" @click="addToCart(product)">Add to cart</button>
                </div>
            </div>

            <Reviews :product-id="product.id.toString()"/>

            <Carousel title="More products like this..." queryset="1"/>
            <Carousel title="Recently viewed" />
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">Learn more about the latest news from Wave</p>
            </div>
            <div class="mx-auto my-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <article v-for="(item, index) in visiblePosts" :key="index" class="flex max-w-xl flex-col items-start justify-between">
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
        </div>
    </div>
</template>

<script>

export default {
    name: "[id]",
};
</script>

<style scoped>

</style>