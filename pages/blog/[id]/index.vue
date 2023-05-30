
<script setup>
definePageMeta({ auth: false });
const route = useRoute();
const config = useRuntimeConfig();
const {data:blogpost, pending, error} = useFetch(
    config.public.BACKEND_API_URL + '/blogpost/' + route.params.id + '/'
);

</script>
<script>
export default {
    name: "index",
    components: {},
    methods: {
        formatDate(time) {
            const date = new Date(time);
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
            return date.toLocaleDateString('en-US', options);
        },
    }
}
</script>

<template>
    <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8"  v-if="pending">
        loading...
    </div>
    <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8"  v-else-if="error">
        {{error}}
    </div>
    <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8"  v-else>
        <img class="w-full h-72 rounded object-cover object-center" :src="blogpost.banner_image.src">
        <div class="px-8">
            <div class="flex my-8">
                <h1 class="flex-1 text-3xl font-bold">{{blogpost.title}}</h1>
                <h3>{{ formatDate(blogpost.created_at) }}</h3>
            </div>
            <div class="my-6">
                <p>{{ blogpost.content }}</p>
            </div>
            <div>
                <h2 class="font-semibold">TLDR: </h2>
                <p>{{ blogpost.short_content_display }}</p>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>