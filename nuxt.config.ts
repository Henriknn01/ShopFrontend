// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
        //'@pina/nuxt'
    ],
    auth: {
        // The module is enabled. Change this to disable the module
        isEnabled: true,
        // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
        origin: 'http://localhost:3000',
        enableGlobalAppMiddleware: true,
    },
    runtimeConfig: {
        apiBaseUrl: 'http://localhost:8000', // can be overridden by NUXT_API_BASE_URL environment variable
        public: {
            apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        }
    }
})
