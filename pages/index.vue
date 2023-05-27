<template>
  <div class="bg-white mx-auto max-w-7xl py-6 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div>
      <div>
        <div class="h-96 mb-10 grid grid-cols-1 gap-4 content-center bg-cover bg-center rounded-lg bg-[url('https://i.ibb.co/xGcrd5d/image-2023-05-27-005017577.png')]">
          <div class="mx-auto">
            <h1 class="text-7xl text-bold text-white font-black">SALE!</h1>
          </div>
        </div>
      </div>
    </div>
      <category-card title="Categories" parent=""/>
      <Carousel title="Featured products" queryset="5" limit="4"/>
      <Carousel title="Everything you need for your dog" queryset="3" limit="4"/>
      <Carousel title="Everything you need for your cat" queryset="4" limit="4"/>
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
