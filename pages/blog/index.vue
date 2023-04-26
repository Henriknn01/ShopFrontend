<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow grid grid-cols-1 gap-16 content-center my-12">
    <h1 class="text-6xl font-bold mx-12">Blog posts</h1>
    <div class="rounded-lg shadow-lg max-h-fit overflow-hidden mx-12">
      <div class="overflow-hidden rounded-lg h-96 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80')]">
      </div>
      <div class="m-6">
        <h1 class="text-4xl font-semibold mb-4">Title</h1>
        <p class="text-xl ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="flex items-center flex-row m-6 inline">
        <div class="flex-1">
          <h3><span class="font-light">Author:</span> Rafal :)</h3>
        </div>
        <div class="flex-1 text-center">
          <h3>24/12/2023</h3>
        </div>
        <div class="flex-1 text-right">
          <button class="rounded bg-blue-500 text-white p-2 hover:bg-blue-400">Read More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog"
}
</script>

<style scoped>

</style>