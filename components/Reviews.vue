<script setup>
const props = defineProps({
    productId: String,
});

const config = useRuntimeConfig();
const { data: reviews, pending, error, refresh } = await useFetch(config.public.BACKEND_API_URL + "/productReview/?format=json&product=" + props.productId);
const { signOut, status, data } = useAuth();
const reviewed = ref(false);
function commentReview() {
    reviewed.value = true;
}
</script>
<template>
    <div>
        <div v-if="pending">
            Loading reviews...
        </div>
        <div class="my-28 text-center" v-else-if="error">
            <h1>{{ error.statusCode }} {{error.statusMessage}}</h1>
        </div>
        <div class="my-2" v-else>
            <ReviewForm :product-id="props.productId" @created="commentReview()" v-if="status === 'authenticated'"/>
            <div v-if="reviewed === true" class="bg-green-500 w-full p-6 text-white rounded">
                <h3>Thank you for your review!</h3>
            </div>
            <h1 class="text-2xl font-bold">Most recent reviews</h1>
            <div v-for="review in reviews" v-if="reviews.length > 0">
                <div class="my-2 flex rounded-2xl shadow-lg p-4 bg-gray-50">
                    <div class="flex-none text-center m-2 px-4">
                        <img class="w-10 h-10 rounded-full mx-auto" :src="'https://api.dicebear.com/6.x/initials/svg?scale=80&seed=' + review.author" alt="profile picture review">
                        <h4 class="font-bold">{{ review.author }}</h4>
                        <p class="font-light">{{ formatDate(review.created_at) }}</p>
                    </div>
                    <div class="flex-1 ml-5">
                        <div class="flex">
                            <div class="flex-1">
                                <p>
                                    {{review.content}}
                                </p>
                            </div>
                            <div class="flex-none ml-10">
                                <StarIcon class="h-6 w-6 text-yellow-500 mx-auto" />
                                <h3 class="text-gray-600 mx-6">{{ review.rating }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-20 text-center" v-else>
                <h3 class="font-semibold">There are no reviews yet. Be the first one to write one.</h3>
            </div>
        </div>
    </div>
</template>

<script>
import {StarIcon} from "@heroicons/vue/24/solid";
export default {
    name: "reviews",
    components: {StarIcon},
    methods: {
        formatDate(time) {
            const date = new Date(time);
            const year = date.toLocaleString("default", { year: "numeric" });
            const month = date.toLocaleString("default", { month: "2-digit" });
            const day = date.toLocaleString("default", { day: "2-digit" });
            return day+month+year;
        },
    }
}
</script>

<style scoped>

</style>