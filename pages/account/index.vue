<script setup>
import { TruckIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";

const {data, status, signOut} = useAuth();
const config = useRuntimeConfig();

const {data: orders, pending, error} = useAuthFetch(
    config.public.BACKEND_API_URL + '/order/?format=json&user=' + data.value.user.id
);

</script>

<template>
  <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-4">Welcome {{data.user.firstName}}!</h1>
        <hr>
      </div>
      <div class="grid grid-cols-4 gap-8 auto-rows-auto">
          <div class="md:col-span-1 col-span-full bg-gray-50 rounded p-2 shadow-xl">
              <div class="bg-gray-200 rounded p-2.5 mb-2 hover:bg-gray-100 cursor-pointer">
                  <h3 class="text-md font-semibold inline-flex gap-2"><TruckIcon class="h-6 w-6 text-gray-500" />Orders</h3>
              </div>
              <div class="rounded p-2.5 mb-2 hover:bg-gray-100 cursor-pointer">
                  <h3 class="text-md inline-flex gap-2"><Cog6ToothIcon class="h-6 w-6 text-gray-500" />Settings</h3>
              </div>
              <div class="rounded p-2.5 hover:bg-gray-100 cursor-pointer">
                  <h3 class="text-md inline-flex gap-2" @click="signOut()"><ArrowRightOnRectangleIcon class="h-6 w-6 text-gray-500" />Sign out</h3>
              </div>
          </div>
          <div class="md:col-span-3 col-span-full">
              <div v-if="pending">
                  <h3>loading data...</h3>
              </div>
              <div v-else-if="error">
                  <h3>{{ error }}</h3>
              </div>
              <div v-else>
                  <div v-if="orders.length > 0">
                      <a v-for="order in orders" :href="'/account/order/' + order.id">
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