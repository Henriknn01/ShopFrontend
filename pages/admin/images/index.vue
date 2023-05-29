<script setup>
import { CloudArrowUpIcon, ClipboardIcon } from "@heroicons/vue/24/outline";
import isAdmin from "../../../middleware/isAdmin";
definePageMeta({
    middleware: isAdmin,
});

const {data, status, signOut} = useAuth();
const config = useRuntimeConfig();

const {data: images, pending, error} = useAuthFetch(
    config.public.BACKEND_API_URL + '/image/'
);
</script>

<template>
    <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="mb-8">
            <div class="flex">
                <h1 class="flex-1 text-3xl font-bold mb-4">Welcome {{data.user.firstName}}!</h1>
                <button class="p-2.5 text-center hover:text-gray-500 inline-flex gap-2 ease-in-out duration-300 hover:gap-1"><CloudArrowUpIcon class="h-6 w-6" /> Upload image</button>

            </div>
            <hr>
        </div>
        <div class="grid grid-cols-4 gap-8 auto-rows-auto">
            <AdminSidePanel active="images"/>
            <div class="md:col-span-3 col-span-full">
                <div v-if="pending">
                    <h3>loading data...</h3>
                </div>
                <div v-else-if="error">
                    <h3>{{ error }}</h3>
                </div>
                <div v-else>
                    <div class="grid md:grid-cols-4 grid-cols-2 gap-8" v-if="images.length > 0">
                        <div class="rounded overflow-hidden" v-for="img in images">
                            <img class="h-48 w-full object-cover" :src="img.src" :alt="img.alt">
                        </div>
                    </div>
                    <div v-else>
                        <h3 class="text-xl font-semibold m-12 text-center">No images</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    methods: {
        copyToClipboard(contentData) {
            navigator.clipboard.writeText(contentData)
        }
    }
}
</script>

<style scoped>

</style>