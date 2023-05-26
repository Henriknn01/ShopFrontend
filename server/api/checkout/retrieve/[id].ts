import Stripe from 'stripe';
import {session} from "next-auth/core/routes";

export default defineEventHandler(async (event) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
        });
        const sessionId = event.context.params.id;
        const session = await stripe.checkout.sessions.retrieve(
            sessionId
        );
        const items = await stripe.checkout.sessions.listLineItems(
            sessionId
        );
        return ({
            id: session.id,
            amount_subtotal: session.amount_subtotal,
            amount_total: session.amount_total,
            created: session.created,
            currency: session.currency,
            customer_details: session.customer_details,
            payment_status: session.payment_status,
            shipping_cost: session.shipping_cost,
            shipping_details: session.shipping_details,
            status: session.status,
            total_details: session.total_details,
            item_list: items.data,
        });
    } catch (e:any) {
        console.warn(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error occurred retrieving payment session data',
        })
    }
});