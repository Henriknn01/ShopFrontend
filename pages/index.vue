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
      <Carousel title="Featured products" queryset="1" limit="4"/>
      <Carousel title="Everything you need for your dog" queryset="2" limit="4"/>
      <Carousel title="Everything you need for your cat" queryset="3" limit="4"/>
      <section class="bg-white">
          <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
              <figure class="max-w-screen-md mx-auto">
                  <svg class="h-12 mx-auto mb-3 text-gray-400" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                  </svg>
                  <blockquote>
                      <p class="text-2xl font-medium text-gray-900">"I was looking for a winter coat for my pup and found the perfect fit at Wave Pet Plus. The
                          quality of the material is top-notch, and the coat is so warm and cozy. Thanks for making my doggo look
                          so stylish!"</p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center mt-6 space-x-3">
                      <img class="w-6 h-6 rounded-full" src='https://api.dicebear.com/6.x/initials/svg?scale=80&seed=John' alt="profile picture">
                      <div class="flex items-center divide-x-2 divide-gray-500">
                          <div class="pr-3 font-medium text-gray-900">John</div>
                          <div class="pl-3 text-sm font-light text-gray-500">30</div>
                      </div>
                  </figcaption>
              </figure>
          </div>
      </section>
  </div>
</template>
<script setup>
definePageMeta({ auth: false });
</script>
<script>
import ShopFooter from "../components/ShopFooter.vue";
import Carousel from "../components/Carousel.vue";
export default {
  name: 'IndexPage',
    components: {Carousel, ShopFooter}
}
</script>
