<template>
  <ShopHeader/>

  <Carousel title="Featured products" :queryset=$route.params.id limit="10"/>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>