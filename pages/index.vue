<template>
  <div class="bg-white">
    <ShopHeader/>
    <div class="mx-auto max-w-7xl mt-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="h-96 grid grid-cols-1 gap-4 content-center bg-cover bg-center rounded-lg bg-[url('https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80')]">
          <div class="mx-auto">
            <h1 class="text-7xl text-bold text-white font-black">SALE!</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-6 sm:py-12 lg:max-w-none lg:py-22">
        <h2 class="text-2xl font-bold text-gray-900">Collections</h2>

        <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          <div class="group relative">
            <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg" alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." class="h-full w-full object-cover object-center">
            </div>
            <h3 class="mt-6 text-sm text-gray-500">
              <a href="#">
                <span class="absolute inset-0"></span>
                Desk and Office
              </a>
            </h3>
            <p class="text-base font-semibold text-gray-900">Work from home accessories</p>
          </div>

          <div class="group relative">
            <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg" alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant." class="h-full w-full object-cover object-center">
            </div>
            <h3 class="mt-6 text-sm text-gray-500">
              <a href="#">
                <span class="absolute inset-0"></span>
                Self-Improvement
              </a>
            </h3>
            <p class="text-base font-semibold text-gray-900">Journals and note-taking</p>
          </div>

          <div class="group relative">
            <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg" alt="Collection of four insulated travel bottles on wooden shelf." class="h-full w-full object-cover object-center">
            </div>
            <h3 class="mt-6 text-sm text-gray-500">
              <a href="#">
                <span class="absolute inset-0"></span>
                Travel
              </a>
            </h3>
            <p class="text-base font-semibold text-gray-900">Daily commute essentials</p>
          </div>
        </div>
      </div>
    </div>

      <Carousel title="Featured products" queryset="28" limit="10"/>
      <Carousel title="Everything you need for your dog" queryset="2" limit="10"/>
      <Carousel title="Everything you need for your cat" queryset="1" limit="10"/>

      <ShopFooter/>
  </div>
</template>
<script>
import ShopFooter from "../components/ShopFooter.vue";
import Carousel from "../components/Carousel.vue";
export default {
  name: 'IndexPage',
    components: {Carousel, ShopFooter}
}
</script>
