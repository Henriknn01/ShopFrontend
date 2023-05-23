<template>
  <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div>
      <div>
        <div class="h-96 mb-10 grid grid-cols-1 gap-4 content-center bg-cover bg-center rounded-lg bg-[url('https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80')]">
          <div class="mx-auto">
            <h1 class="text-7xl text-bold text-white font-black">SALE!</h1>
          </div>
        </div>
      </div>
    </div>
      <category-card title="Categories" parent=""/>
      <Carousel title="Featured products" queryset="1" limit="4"/>
      <Carousel title="Everything you need for your dog" queryset="2" limit="4"/>
      <Carousel title="Everything you need for your cat" queryset="3" limit="4"/>
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
