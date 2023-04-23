// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
        '@pinia-plugin-persistedstate/nuxt',
    ],
    auth: {
        // The module is enabled. Change this to disable the module
        isEnabled: true,
        // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
        origin: 'http://localhost:3000',
        enableGlobalAppMiddleware: true,
    },
    publicRuntimeConfig: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_API_URL: process.env.BACKEND_API_URL,
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
        CHECKOUT_FREE_SHIPPING_THRESHOLD: process.env.CHECKOUT_FREE_SHIPPING_THRESHOLD,
        CHECKOUT_FIXED_SHIPPING_COST: process.env.CHECKOUT_FIXED_SHIPPING_COST,
    },
    privateRuntimeConfig: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    imports: {
        dirs: ['stores']
    }
})
