<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-49 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-49 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pt-5 pb-2">
                <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                      <button :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium']">{{ category.name }}</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pt-10 pb-8">
                    <div class="grid grid-cols-2 gap-x-4">
                      <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                        <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                        </div>
                        <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{ section.name }}</p>
                      <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                        <li v-for="item in section.items" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4" v-if="status === 'unauthenticated'">
                <div class="flow-root">
                  <a href="/account/login" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                </div>
                <div class="flow-root">
                  <a href="/account/create" class="-m-2 block p-2 font-medium text-gray-900">Create account</a>
                </div>
              </div>
                <div class="space-y-6 border-t border-gray-200 py-6 px-4" v-else-if="status === 'authenticated'">
                    <div class="flow-root">
                    </div>
                    <a href="/account">
                        <img class="w-12 h-12 rounded-full" :src="'https://api.dicebear.com/6.x/initials/svg?scale=80&seed='+data.user.email"  alt="profile picture header">
                    </a>
                </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p class="flex h-10 items-center justify-center bg-blue-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" v-if="config.public.CHECKOUT_FREE_SHIPPING_THRESHOLD > 0">Get free delivery on orders over {{ config.public.CHECKOUT_FREE_SHIPPING_THRESHOLD }} kr</p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button type="button" class="rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="open = true">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="/">
                <span class="sr-only">Wave</span>
                <img class="h-8 w-auto" src="https://norheimweb.ams3.cdn.digitaloceanspaces.com/assets/wave-logo-shape.png" alt="#" />
              </a>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                  <div class="relative flex">
                    <PopoverButton :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">{{ category.name }}</PopoverButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div v-for="item in category.featured" :key="item.name" class="group relative text-base sm:text-sm">
                                <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                                </div>
                                <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                                  <span class="absolute inset-0 z-10" aria-hidden="true" />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                              <div v-for="section in category.sections" :key="section.name">
                                <p :id="`${section.name}-heading`" class="font-medium text-gray-900">{{ section.name }}</p>
                                <ul role="list" :aria-labelledby="`${section.name}-heading`" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                  <li v-for="item in section.items" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" v-if="status === 'unauthenticated'">
                <a href="/account/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</a>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="/account/create" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
              </div>
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" v-else-if="status === 'authenticated'">
                    <a href="/account/">
                      <img class="rounded-full hover:shadow-md h-7 w-7" :src="'https://api.dicebear.com/6.x/initials/svg?scale=80&seed='+data.user.email" alt="profile picture header">
                    </a>
                </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="/cart" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ shoppingCart.cartCount }}</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>


<script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline';
  import {useShoppingCartStore} from "../stores/ShoppingCart";

  const config = useRuntimeConfig();

  const { signOut, status, data } = useAuth();

  const shoppingCart = useShoppingCartStore();

  let categories = []
  let {data: categoryData } = await useFetch(config.public.BACKEND_API_URL + `/productcategory/`)
  let {data: featuredlist } = await useFetch(config.public.BACKEND_API_URL + `/productlist/?featured=true`)

  function transformData(categories, products) {
      const categoryMap = new Map();
      categories.forEach(category => {
          if (category.parent_category !== null) {
              if (!categoryMap.has(category.parent_category)) {
                  categoryMap.set(category.parent_category, []);
              }
              categoryMap.get(category.parent_category).push({
                  id: category.id,
                  name: category.name,
                  href: "/categories/" + category.id
              });
          }
      });

      const productMap = new Map();
      products.forEach(product => {
          product.category.forEach(catId => {
              if (!productMap.has(catId)) {
                  productMap.set(catId, []);
              }
              productMap.get(catId).push({
                  name: product.name,
                  href: '/productlist/' + product.id,
                  imageSrc: product.image[0]?.src,
                  imageAlt: product.image[0]?.alt
              });
          });
      });

      const output = categories.filter(category => category.parent_category === null).map(category => {
          const sections = categoryMap.get(category.id) || [];
          return {
              id: category.id,
              name: category.name,
              featured: productMap.get(category.id) || [],
              sections: sections.map(section => {
                  return {
                      id: section.id,
                      name: section.name,
                      items: categoryMap.get(section.id) || []
                  };
              })
          };
      });
      return output;
  }

  try {
      categories = transformData(categoryData.value, featuredlist.value)
  } catch (e) {
  }

  const navigation = {
      categories: categories,
    pages: [
      { name: 'Q&A', href: '/qanda' },
      { name: 'Blog', href: '/blog' },
      { name: 'About us', href: '/about' },
    ],
  }
  const open = ref(false)

</script>
<script>
export default {
  name: "ShopHeader"
}
</script>