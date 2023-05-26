<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";
const {data:authData, status} = useAuth();
const shoppingCart = useShoppingCartStore();
const config = useRuntimeConfig();
shoppingCart.purchaseCompleted(authData.value);
</script>
<template>
  <div class="mx-auto max-w-7xl my-28 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
          <CheckBadgeIcon class="h-36 w-36 text-green-500 mx-auto" />
          <h1 class="text-4xl font-black">Purchase successful</h1>
      </div>
  </div>
</template>

<script>
export default {
    name: "index"
}
</script>

<style scoped>

</style>