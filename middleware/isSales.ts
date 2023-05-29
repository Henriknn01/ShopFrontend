export default defineNuxtRouteMiddleware((to, from) => {
    const {data, status} = useAuth();
    if (status.value != 'authenticated') {
        return navigateTo('/account/login');
    }
    console.log(data.value.user)

    if (data.value.user.role != 'admin' || data.value.user.role != 'sales') {
        return abortNavigation('Insufficient permissions');
    }
});