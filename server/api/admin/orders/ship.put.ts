import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return createError({statusMessage: 'Unauthorized', statusCode: 401})
    } else {
        if (session.user.role == 'admin' || session.user.role == 'sale') {
            try {
                const config = useRuntimeConfig();
                const body = await readBody(event);
                const response = await fetch(config.public.BACKEND_API_URL + "/order/" + body.id + "/", {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + session.user.accessToken,
                    },
                });
                return response.status;
            } catch (e) {
                console.warn(e);
            }
        } else {
            return createError({statusMessage: 'Unauthorized', statusCode: 401})
        }
    }
});