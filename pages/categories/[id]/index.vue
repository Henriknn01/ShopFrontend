<script setup>
const route = useRoute()
const id = route.params.id
</script>

<template>
    <category-card title="categories" :parent="id"/>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>