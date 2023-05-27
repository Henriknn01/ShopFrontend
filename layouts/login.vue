<template>
    <div class="grid grid-cols-3 h-screen">
        <slot/>
        <div class="hidden md:block md:col-span-2 h-full overflow-hidden bg-cover bg-[url('https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80')]">
        </div>
    </div>
</template>

<script>
export default {
    name: "login"
}
</script>

<style scoped>

</style>