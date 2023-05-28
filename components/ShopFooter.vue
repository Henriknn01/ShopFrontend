<template>
  <footer class="p-4 bg-gray-50 sm:p-6 mt-autoa">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <a href="https://flowbite.com/" class="flex items-center">
          <img src="https://norheimweb.ams3.cdn.digitaloceanspaces.com/assets/wave-logo-shape.png" class="h-8 mr-3" alt="Wave Logo" />
          <img src="https://norheimweb.ams3.cdn.digitaloceanspaces.com/assets/wave-logo-text.png" class="h-8 mr-3" alt="Wave Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap sr-only">Wave</span>
        </a>
      </div>
      <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
          <ul class="text-gray-600 ">
            <li class="mb-4">
              <a href="/about" class="hover:underline">About us</a>
            </li>
            <li>
              <a href="/qanda" class="hover:underline">Q&A</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
          <ul class="text-gray-600">
            <li class="mb-4">
              <a href="https://github.com/Henriknn01/Shopfrontend" class="hover:underline ">Github Frontend</a>
            </li>
            <li>
              <a href="https://github.com/Henriknn01/ShopBackend" class="hover:underline">Github Backend</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
          <ul class="text-gray-600">
            <li class="mb-4">
              <a href="/privacy" class="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="/tos" class="hover:underline">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 border-gray-200 sm:mx-auto lg:my-8" />
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center">© 2023 <a href="#" class="hover:underline">Wave™</a>. All Rights Reserved.
        </span>
      <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
        <a href="https://github.com/Henriknn01/Shopfrontend" class="text-gray-500 hover:text-gray-900">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
          <span class="sr-only">GitHub account</span>
        </a>
      </div>
    </div>
    <div class="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 sm:flex items-center sm:justify-between">
      <span class="text-sm text-gray-500 sm:text-center">
        <b>Disclaimer:</b> <br>
        This website is a result of a university group project,
        performed in the course
        <a href="https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet" class="text-blue-600">
          IDATA2301 Web technologies
        </a>,
        at <a href="https://ntnu.no" class="text-blue-600">NTNU</a>.
        All the information provided here is a result of imagination.
        Any resemblance with real companies or products is a coincidence.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ShopFooter"
}
</script>

<style scoped>

</style>
