<script setup>
import isSales from "../../../middleware/isSales";
definePageMeta({
    middleware: isSales,
});

const {data, status, signOut} = useAuth();
const config = useRuntimeConfig();

const {data: orders, pending, error} = useAuthFetch(
    config.public.BACKEND_API_URL + '/order/?format=json&ordering=created_at'
);
</script>

<template>
    <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-4">Welcome {{data.user.firstName}}!</h1>
            <hr>
        </div>
        <div class="grid grid-cols-4 gap-8 auto-rows-auto">
            <AdminSidePanel active="history"/>
            <div class="md:col-span-3 col-span-full">
                <div v-if="pending">
                    <h3>loading data...</h3>
                </div>
                <div v-else-if="error">
                    <h3>{{ error }}</h3>
                </div>
                <div v-else>
                    <div v-if="orders.length > 0">
                        <a v-for="order in orders" :href="'/admin/order/' + order.id">
                            <div class="bg-gray-50 shadow-xl hover:shadow-2xl cursor-pointer transition-shadow ease-in-out duration-300 p-4 rounded mb-4">
                                <div class="flex gap-8">
                                    <div class="flex-1">
                                        <label class="font-light">Order nr.</label>
                                        <h4>{{order.id}}</h4>
                                    </div>
                                    <div class="flex-1">
                                        <label class="font-light">Ordered</label>
                                        <h4>{{formatDate(order.created_at)}}</h4>
                                    </div>
                                    <div class="flex-1">
                                        <label class="font-light">Order status</label>
                                        <h4>{{order.status}}</h4>
                                    </div>
                                    <div class="flex-1">
                                        <label class="font-light">Payment status</label>
                                        <h4>{{order.payment_status}}</h4>
                                    </div>
                                    <div>
                                        <label class="font-light">Total</label>
                                        <h4>{{order.total}} kr</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div v-else>
                        <h3 class="text-xl font-semibold m-12 text-center">No orders</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "history",
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