<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import BlogSection from "../../components/BlogSection.vue";
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

            <CategoryCarousel title="More products like this..." :queryset="product.category.slice(-1)" limit="4"/>

            <BlogSection/>
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