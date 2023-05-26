import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
        });
        const body = await readBody(event);
        console.log(body);
        const session = await stripe.checkout.sessions.expire(body.stripeSessionID);
        console.log(session);
    } catch (e) {
        console.warn(e);
        return null;
    }
})
