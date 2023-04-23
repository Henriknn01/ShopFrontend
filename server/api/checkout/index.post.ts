import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
        });
        const body = await readBody(event);
        const lineItems = body.line_items;

        let total_cost = 0;

        for (let i of lineItems) {
            total_cost += (i.price_data.unit_amount/100)*i.quantity;
        }
        const standardShippingCost:number = Number(process.env.CHECKOUT_FIXED_STANDARD_SHIPPING_COST)*100
        const expressShippingCost:number = Number(process.env.CHECKOUT_FIXED_EXPRESS_SHIPPING_COST)*100

        let standardShipping = {};
        if (total_cost > Number(process.env.CHECKOUT_FREE_SHIPPING_THRESHOLD)) {
            standardShipping = {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 0, currency: 'nok'},
                    display_name: 'Standard shipping',
                    delivery_estimate: {
                        minimum: {unit: 'business_day', value: 5},
                        maximum: {unit: 'business_day', value: 7},
                    },
                },
            }
        } else {
            standardShipping = {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: standardShippingCost, currency: 'nok'},
                    display_name: 'Standard shipping',
                    delivery_estimate: {
                        minimum: {unit: 'business_day', value: 5},
                        maximum: {unit: 'business_day', value: 7},
                    },
                },
            }
        }
        let shippingOptions = [standardShipping, {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: expressShippingCost, currency: 'nok'},
                display_name: 'Express shipping',
                delivery_estimate: {
                    minimum: {unit: 'business_day', value: 1},
                    maximum: {unit: 'business_day', value: 3},
                },
            }
        }];

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: process.env.FRONTEND_URL + "/cart/checkout/success",
            cancel_url: process.env.FRONTEND_URL + "/cart/checkout/cancel",
            shipping_address_collection: {allowed_countries: ['NO']},
            shipping_options: shippingOptions,
            payment_method_types: ['card', 'klarna']
        });
        return ({id: session.id, url: session.url});
    } catch (e) {
        console.warn(e);
        return null;
    }
})