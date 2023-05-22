<script setup>
const props = defineProps({
    productId: String,
});

const config = useRuntimeConfig();
const { data: reviews, pending, error, refresh } = await useFetch(config.public.BACKEND_API_URL + "/productReview/?format=json&product=" + props.productId);
const { signOut, status, data } = useAuth();
function formatDate(time) {
    const date = new Date(time);

    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return day+month+year;
}
</script>
<template>
    <div class="my-2">
        <div class="w-full" v-if="status === 'authenticated'">
            <h5 class="text-2xl font-bold">Write a review</h5>
            <div class="gap-4">
                <div>
                    <label>Content</label>
                    <textarea class="w-full h-20 shadow-inner rounded-md text-md p-2 bg-gray-50"></textarea>
                </div>
                <div>
                    <label>Stars</label>
                    <div class="flex text-xl">
                        <input type="number" class="p-2 shadow-inner rounded-md bg-gray-50" max="5" min="0"/><span class="m-2">/ 5</span>
                    </div>
                </div>
                <div class="my-4">
                    <button class="bg-indigo-700 p-2 text-white rounded-md">Submit review</button>
                </div>
            </div>
        </div>
        <h1 class="text-2xl font-bold">Most recent reviews</h1>
        <div v-for="review in reviews" v-if="reviews.length > 0">
            <div class="my-2 flex rounded-2xl shadow-lg p-4 bg-gray-50">
                <div class="flex-none text-center m-2 px-4">
                    <img class="w-10 h-10 rounded-full mx-auto" :src="'https://api.dicebear.com/6.x/initials/svg?scale=80&seed=anons'" alt="profile picture review">
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
</template>

<script>
import {StarIcon} from "@heroicons/vue/24/solid";

export default {
    name: "reviews",
    components: {StarIcon},
}
</script>

<style scoped>

</style>