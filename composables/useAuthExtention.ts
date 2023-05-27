import {ref} from "vue";


export default function useAuthExtention() {
    const errors = ref();
    const { signIn } = useAuth();
    const createUser = async (user:any) => {
        const config = useRuntimeConfig();
        const formData = new FormData();
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('re_password', user.re_password);
        const response = await fetch(
            config.public.BACKEND_API_URL + '/auth/users/',
            {
                method: 'POST',
                body: formData,
            }
        );
        const resp = await response.json()
        if (response.status == 201) {
            console.log('User created!')
            await signIn('credentials', {username: user.email, password: user.password});
        } else {
            errors.value = resp;
        }
    }
    return {
        errors,
        createUser
    }
}