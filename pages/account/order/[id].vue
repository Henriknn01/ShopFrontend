<script setup>
import {TrashIcon} from "@heroicons/vue/24/outline";

const route = useRoute();
const {data, status, signOut} = useAuth();
const config = useRuntimeConfig();

const {data: order, pending, error} = useAuthFetch(
    config.public.BACKEND_API_URL + '/order/' + route.params.id + '/'
);
const {data: orderItems, pending: pendingItems, error: errorItems} = useAuthFetch(
    config.public.BACKEND_API_URL + '/order-item/?format=json&order=' + route.params.id
);
</script>

<template>
  <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <div v-if="pending">
          <h3>loading data...</h3>
      </div>
      <div v-else-if="error">
          <h3>{{ error }}</h3>
      </div>
      <div v-else>
          <div class="mb-8">
              <h1 class="text-3xl font-bold mb-4">Order - {{order.id}}</h1>
              <hr>
          </div>
          <div class="grid grid-cols-2 gap-8">
              <div class="mb-8">
                  <h2 class="font-semibold text-lg">Order details</h2>
                  <hr class="my-2">
                  <div class="flex mb-4">
                      <div class="flex-1">
                          <label class="font-light">Order nr.</label>
                          <h4>{{order.id}}</h4>
                      </div>
                      <div class="flex-1">
                          <label class="font-light">Status</label>
                          <h4>{{order.status}}</h4>
                      </div>
                  </div>

                  <div class="flex mb-4">
                      <div class="flex-1">
                          <label class="font-light">Payment status</label>
                          <h4>{{order.payment_status}}</h4>
                      </div>
                      <div class="flex-1">
                          <label class="font-light">Date & time</label>
                          <h4>{{formatDate(order.created_at)}}</h4>
                      </div>
                  </div>
              </div>

              <div class="mb-8">
                  <h2 class="font-semibold text-lg">Shipping details</h2>
                  <hr class="my-2">
                  <div class="flex mb-4">
                      <div class="flex-1">
                          <label class="font-light">Address</label>
                          <h4>{{order.shipping_address}}</h4>
                      </div>
                      <div class="flex-1">
                          <label class="font-light">City</label>
                          <h4>{{order.shipping_city}}</h4>
                      </div>
                  </div>
                  <div class="flex mb-4">
                      <div class="flex-1">
                          <label class="font-light">Country</label>
                          <h4>{{order.shipping_country}}</h4>
                      </div>
                      <div class="flex-1">
                          <label class="font-light">Zip code</label>
                          <h4>{{order.shipping_postal_code}}</h4>
                      </div>
                  </div>
                  <div class="">
                      <label class="font-light">Full name</label>
                      <h4>{{order.shipping_full_name}}</h4>
                  </div>
              </div>
          </div>
          <div v-if="pendingItems">
              <h3>loading data...</h3>
          </div>
          <div v-else-if="errorItems">
              <h3>{{ errorItems }}</h3>
          </div>
          <div v-else>
              <h2 class="font-semibold text-lg mb-2">Ordered items</h2>
              <a v-for="item in orderItems" :href="'/product/'+item.product.id">
                  <div class="bg-gray-50 shadow-xl hover:shadow-2xl cursor-pointer transition-shadow ease-in-out duration-300 p-4 rounded mb-4">
                      <div class="flex inline-flex items-center w-full">
                          <div class="flex-none h-20 w-20">
                              <a :href="item.link">
                                  <img class="rounded h-full w-full object-cover" :src="(item.product.image.length>0 ? item.product.image[0].src : '')" :alt="(item.product.image.length>0 ? item.product.image[0].alt : 'no image')">
                              </a>
                          </div>
                          <div class="flex-1">
                              <a :href="item.link">
                                  <div class="m-4">
                                      <h2 class="text-sm font-semibold mb-1"> {{item.product.name}}</h2>
                                      <h3 class="text-sm font-light text-gray-500 mb-1">{{item.product.desc}}</h3>
                                      <h3 class="text-sm font-semibold">{{item.price}} kr</h3>
                                  </div>
                              </a>
                          </div>
                          <div class="flex-1 text-center">
                              <label>Quantity</label>
                              <h5 class="px-3 font-semibold">{{item.quantity}}</h5>
                          </div>
                          <div class="flex-none text-right">
                              <label>Total</label>
                              <h3 class="font-semibold">{{item.total}} kr</h3>
                          </div>
                      </div>
                  </div>
              </a>
          </div>
          <div class="text-right">
              <h5 class="mb-2"><span class="font-semibold">Subtotal: </span> {{order.subtotal}} kr</h5>
              <h5 class="mb-2"><span class="font-semibold">Shipping: </span> {{order.shipping_cost}} kr</h5>
              <hr>
              <h4 class="text-lg"><span class="font-semibold">Total: </span> {{order.total}} kr</h4>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "[id]",
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