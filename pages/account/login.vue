<script setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
    layout: "login",
})
const { signIn } = useAuth()
</script>

<template>
    <div class="col-span-3 md:col-span-1 p-10 md:p-20">
        <div class="grid grid-cols-4 auto-rows-max gap-2 my-16">
            <div class="col-span-full row-span-1">
                <img class="h-16" src="https://norheimweb.ams3.cdn.digitaloceanspaces.com/assets/wave-logo-shape.png">
            </div>
            <div class="col-span-full row-span-1">
                <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                <p class="mt-2 text-sm text-gray-600">
                    Or
                    <!-- space -->
                    <a href="/account/create" class="font-medium text-indigo-600 hover:text-indigo-500">create a new account</a>
                </p>
            </div>
            <div class="col-span-full row-span-1">
                <h3 v-if="urlError==='CredentialsSignin'" class="text-red-500 font-semibold">Wrong username or password *</h3>
                <form class="mt-2 space-y-4" action="#" @submit.prevent="signIn('credentials', {username: this.form.email, password: this.form.password});">
                    <input type="hidden" name="remember" value="true">
                    <div>
                        <label for="email-address" class="font-medium">Email address</label>
                        <input id="email-address" v-model="form.email" name="email" type="email" autocomplete="email" required class="relative block w-full rounded border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address">
                    </div>
                    <div>
                        <label for="password" class="font-medium">Password</label>
                        <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="relative block w-full rounded border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password">
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd"></path>
                              </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            urlError: this.$route.query.error,
        }
    },
}
</script>