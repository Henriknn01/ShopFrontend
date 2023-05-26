import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export function useAuthFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
    const {data: userAuth} = useAuth();
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.BACKEND_API_URL ?? 'http://127.0.0.1:8000',
        // cache request
        key: url,

        // set user token if connected
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value.user.accessToken}` }
            : {},

        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    };

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults);

    return useFetch(url, params);
}
