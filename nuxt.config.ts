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
        origin: process.env.FRONTEND_URL,
        enableGlobalAppMiddleware: true,
        addDefaultCallbackUrl: true,
    },
    runtimeConfig: {
        NUXT_SECRET: process.env.NUXT_SECRET,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION,
        OPENAI_MODEL: process.env.OPENAI_MODEL,
        public: {
           FRONTEND_URL: process.env.FRONTEND_URL,
           BACKEND_API_URL: process.env.BACKEND_API_URL,
           STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
           CHECKOUT_FREE_SHIPPING_THRESHOLD: process.env.CHECKOUT_FREE_SHIPPING_THRESHOLD || 0,
           CHECKOUT_FIXED_SHIPPING_COST: process.env.CHECKOUT_FIXED_SHIPPING_COST,
        },
    },
    imports: {
        dirs: ['stores', 'interfaces']
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            title: 'PetPlus',
            charset: 'utf-8',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Shop the best selection of pet supplies at our online pet store. Find everything you need for your furry friends, from food and toys to grooming and healthcare products. Enjoy fast shipping and excellent customer service.'
                }],
            link: [],
        }
    },
})
