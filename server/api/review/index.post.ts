import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        return { status: 'unauthenticated!'};
    } else {
        try {
            const config = useRuntimeConfig();
            const body = await readBody(event);
            const response = await fetch(config.public.BACKEND_API_URL + "/productReview/", {
                method: "POST",
                body: JSON.stringify({
                    content: body.msg,
                    rating: body.rating,
                    product: body.product,
                    author: body.author,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + body.token,
                },
            });
            return response.status;
        } catch (e) {
            console.warn(e);
            return null;
        }
    }

});