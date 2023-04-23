<script setup>
const shoppingCart = useShoppingCartStore();
import { TrashIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8">
      <h1 class="font-bold text-5xl text-gray-900 my-4">Shopping cart</h1>
      <div class="grid grid-cols-12 auto-rows-auto my-10 gap-12">
          <div class="col-span-12 md:col-span-6">
              <div v-if="shoppingCart.cartCount > 0">
                <div v-for="item in shoppingCart.cart">
                    <div class="border-y flex inline-flex items-center py-6 w-full">
                        <div class="flex-none h-32 w-32">
                            <a :href="item.link">
                                <img :src="item.img" :alt="item.imgAlt">
                            </a>
                        </div>
                        <div class="flex-1">
                            <a :href="item.link">
                                <div class="m-4">
                                    <h2 class="text-sm font-semibold mb-1"> {{item.name}}</h2>
                                    <h3 class="text-sm font-light text-gray-500 mb-1">{{item.desc}}</h3>
                                    <h3 class="text-sm font-semibold">${{item.price}}</h3>
                                </div>
                            </a>
                        </div>
                        <div class="flex-none">
                            <div class="bg-gray-50 rounded-full overflow-hidden shadow-lg flex inline-flex items-center p-1 m-8">
                                <button class="px-2 text-gray-500 hover:text-blue-500" @click="shoppingCart.decreaseItemQuantity(item)">-</button>
                                <h5 class="px-3">{{item.quantity}}</h5>
                                <button class="px-2 text-gray-500 hover:text-blue-500" @click="shoppingCart.increaseItemQuantity(item)">+</button>
                            </div>
                        </div>
                        <div class="flex-none">
                            <button class="mx-6">
                                <TrashIcon class="h-6 w-6 text-gray-500 hover:text-red-500 transition duration-300" @click="shoppingCart.removeItem(item)" />
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <div v-else class="h-64 m-auto">
                  <h3 class="text-xl font-semibold text-center m-auto py-24 h-fit w-fit">no items in cart</h3>
              </div>
          </div>
          <div class="col-span-12 md:col-span-6">
              <div class="w-full bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                  <div class="px-6 py-4">
                      <h2 class="font-semibold text-gray-800 text-xl mb-2">Order summary</h2>
                      <div class="flex flex-row py-4 border-b text-sm">
                          <h4 class="flex-1 text-gray-600">Subtotal</h4>
                          <h4 class="text-gray-900">${{ shoppingCart.subtotal }}</h4>
                      </div>
                      <div class="flex flex-row py-4 border-b text-sm">
                          <h4 class="flex-1 text-gray-600">Shipping estimate</h4>
                          <h4 class="text-gray-900">${{shoppingCart.shipping}}</h4>
                      </div>
                      <div class="flex flex-row py-4 border-b text-sm">
                          <h4 class="flex-1 text-gray-600">Tax estimate</h4>
                          <h4 class="text-gray-900">${{shoppingCart.tax}}</h4>
                      </div>
                      <div class="flex flex-row py-4 font-semibold text-lg">
                          <h4 class="flex-1 text-gray-800">Order total</h4>
                          <h4 class="text-gray-900">${{shoppingCart.total}}</h4>
                      </div>
                      <button @click="addToCart" class="p-4 bg-indigo-600 rounded-lg text-white w-full mt-6">add item</button>

                      <button @click="shoppingCart.makePayment" v-if="shoppingCart.cartCount > 0" class="p-4 bg-indigo-600 rounded-lg text-white w-full mt-6">Checkout</button>
                      <button v-else class="p-4 bg-gray-600 rounded-lg text-white w-full mt-6" disabled>Checkout</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "index",
}
</script>

<style scoped>

</style>