export default defineNuxtRouteMiddleware((to, from) => {
    const {data, status} = useAuth();
    if (status.value != 'authenticated') {
        return navigateTo('/account/login');
    }

    if (data.value.user.role != 'sales') {
        if (data.value.user.role != 'admin') {
            return abortNavigation('Insufficient permissions');
        }
    }
});