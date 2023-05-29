export default defineNuxtRouteMiddleware((to, from) => {
    const {data, status} = useAuth();
    if (status.value != 'authenticated') {
        return navigateTo('/account/login')
    }
    console.log(data.value.user)

    if (data.value.user.role != 'admin') {
        return abortNavigation('Insufficient permissions')
    }
});