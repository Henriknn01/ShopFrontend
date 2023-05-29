<script setup>
import isAdmin from "../../../middleware/isAdmin";
definePageMeta({
    middleware: isAdmin,
});

const {data, status, signOut} = useAuth();
const config = useRuntimeConfig();

const {data: users, pending, error} = useAuthFetch(
    config.public.BACKEND_API_URL + '/user/'
);
</script>

<template>
    <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-4">Welcome {{data.user.firstName}}!</h1>
            <hr>
        </div>
        <div class="grid grid-cols-4 gap-8 auto-rows-auto">
            <AdminSidePanel active="users"/>
            <div class="md:col-span-3 col-span-full">
                <div v-if="pending">
                    <h3>loading data...</h3>
                </div>
                <div v-else-if="error">
                    <h3>{{ error }}</h3>
                </div>
                <div v-else>
                    <div v-if="users.length > 0">
                        <a v-for="user in users" :href="'#'">
                            <div class="bg-gray-50 shadow-xl hover:shadow-2xl cursor-pointer transition-shadow ease-in-out duration-300 p-4 rounded mb-4">
                                <div class="flex gap-8">
                                    <div class="flex-1">
                                        <label class="font-light">User id</label>
                                        <h4>{{user.id}}</h4>
                                    </div>
                                    <div class="flex-1">
                                        <label class="font-light">User email</label>
                                        <h4>{{user.email}}</h4>
                                    </div>
                                    <div class="flex-1">
                                        <label class="font-light">Full name</label>
                                        <h4>{{user.first_name}} {{user.last_name}}</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div v-else>
                        <h3 class="text-xl font-semibold m-12 text-center">No users</h3>
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
        formatDate(time) {
            const date = new Date(time);
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
            return date.toLocaleDateString('en-US', options);
        },
    }
}
</script>

<style scoped>

</style>