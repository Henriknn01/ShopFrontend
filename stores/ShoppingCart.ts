import {defineStore} from "pinia";
import {ICartItem} from "../interfaces/ICartItem";
import {ICartState} from "../interfaces/ICartState";
import {ILineItem} from "../interfaces/ILineItem";

// @ts-ignore
export const useShoppingCartStore = defineStore('ShoppingCart',{
    state: (): ICartState => {
        return {
            cart: [],
            cartCount: 0,
            shipping: 0,
            subtotal: 0,
            tax: 0,
            total: 0,
            taxRate: 0.25,
            fixedShippingCost: Number(process.env.CHECKOUT_FIXED_STANDARD_SHIPPING_COST),
            freeShippingThreshold: Number(process.env.CHECKOUT_FREE_SHIPPING_THRESHOLD),
            stripeSessionID: "",
        }
    },
    actions: {
        addItem(item: ICartItem) {
            const duplicate = this.cart.find(i => item.id == i.id);
            if (duplicate) {
                duplicate.quantity += 1;
                this.cartCount += 1;
                this.calculateTotal();
            } else {
                this.cart.push(item);
                this.cartCount += 1;
                this.calculateTotal();
            }
        },
        removeItem(item: ICartItem) {
            const fItem = this.cart.find(i => item.id == i.id);
            const foundItem = this.cart.indexOf(fItem);
            if (foundItem > -1) {
                this.cart.splice(foundItem, 1);
                this.cartCount -= fItem.quantity;
                this.calculateTotal();
            } else {
                console.log('item not found');
            }
        },

        increaseItemQuantity(item: ICartItem) {
            const foundItem = this.cart.find(i => item.id == i.id);
            if (foundItem) {
                foundItem.quantity += 1;
                this.cartCount += 1;
                this.calculateTotal();
            } else {
                console.log('item not found');
            }
        },
        decreaseItemQuantity(item: ICartItem) {
            const foundItem = this.cart.find(i => item.id == i.id);
            if (foundItem && foundItem.quantity > 1) {
                foundItem.quantity -= 1;
                this.cartCount -= 1;
                this.calculateTotal();
            } else {
                console.log('item not found');
            }
        },
        setItemQuantity(item: ICartItem, quantity: number) {
            // TODO: test if function works!
            const foundItem = this.cart.find(i => item.id == i.id);
            if (foundItem) {
                foundItem.quantity = quantity;
                this.calculateTotal();
            } else {
                console.log('item not found');
            }
        },
        calculateTotal() {
            // set initial values
            this.total = 0;
            this.tax = 0;
            this.subtotal = 0;
            this.shipping = 0;

            // set values
            for (let i of this.cart) {
                this.total += i.price*i.quantity;
                this.tax += (i.price*i.quantity)*this.taxRate;
            }
            this.subtotal = this.total-this.tax;
            if (this.total > this.freeShippingThreshold || this.cart.length == 0) {
                this.shipping = 0;
            } else {
                this.shipping = this.fixedShippingCost;
            }
            this.total += this.shipping;

            // set values to contain two decimal places.
            this.total = Number(this.total.toFixed(2));
            this.tax = Number(this.tax.toFixed(2));
            this.subtotal = Number(this.subtotal.toFixed(2));
            this.shipping = Number(this.shipping.toFixed(2));
        },

        async makePayment() {
            const {status} = useAuth();
            if (status == 'authenticated') {
                const headers = {
                    "Content-Type": 'multipart/form-data',
                };

                let mappedArr = this.cart.map(item=> {
                    return <ILineItem> {
                        price_data: {
                            currency: 'nok',
                            product_data: {
                                name: item.name,
                                images: (item.img.length>0 ? [item.img] : []),
                            },
                            unit_amount: item.price*100,
                        },
                        quantity: item.quantity,
                    }
                });

                let tmpArr = [];
                for (let i of mappedArr) {
                    tmpArr.push(i)
                }

                const response = await $fetch(
                    "/api/checkout",
                    {
                        method: "POST",
                        headers: headers,
                        body: { line_items: mappedArr},
                    }
                );

                const session =  await response;

                this.stripeSessionID = String(session.id);
                window.location.replace(session.url);
            } else {
                const config = useRuntimeConfig()
                window.location.replace(config.public.FRONTEND_URL + '/account/login');
            }

        },

        async expireStripeSession() {
            const headers = {
                "Content-Type": 'multipart/form-data',
            };
            const response = await $fetch(
                "/api/checkout/expire",
                {
                    method: "POST",
                    headers: headers,
                    body: { stripeSessionID: this.stripeSessionID},
                }
            );
            return response;
        },

        async retrieveStripeSession() {
            const headers = {
                "Content-Type": 'application/json',
            };
            const config = useRuntimeConfig();
            const response = await fetch(
                config.public.FRONTEND_URL + "/api/checkout/retrieve/" + this.stripeSessionID,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return await response.json();
        },

        clearCart(){
            this.cart = [];
            this.stripeSessionID = "";
            this.cartCount = 0;
            this.calculateTotal();
        },

        async purchaseCompleted(userAuth:any) {
            try {
                const session = await this.retrieveStripeSession();
                const orderDetails = await fetch("http://127.0.0.1:8000/order/", {
                    method: "POST",
                    body: JSON.stringify({
                        stripe_id: session.id,
                        user: userAuth.user.id,
                        subtotal: session.amount_subtotal,
                        total: session.amount_total,
                        transaction_status: session.status,
                        payment_status: session.payment_status,
                        shipping_cost: session.shipping_cost.amount_total,
                        shipping_full_name: session.shipping_details.name,
                        shipping_address: session.shipping_details.address.line1,
                        shipping_city: session.shipping_details.address.city,
                        shipping_country: session.shipping_details.address.country,
                        shipping_postal_code: session.shipping_details.address.postal_code,
                        shipping_phone_number: session.customer_details.phone,
                    }),
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + userAuth.user.accessToken,
                    },
                });
                const response = await orderDetails;
                if (response.status == 201) {
                    const responseData = await response.json();
                    for (const i of session.item_list) {
                        const found = this.cart.find(f => f.name == i.description && f.price == (i.price.unit_amount / 100));
                        if (found) {
                            const orderItem = await fetch("http://127.0.0.1:8000/order-item/", {
                                method: "POST",
                                body: JSON.stringify({
                                    order: responseData.id,
                                    product: found.id,
                                    price: i.price.unit_amount/100,
                                    total: i.amount_total/100,
                                    quantity: i.quantity,
                                }),
                                headers: {
                                    "Content-Type": 'application/json',
                                    "Authorization": 'Bearer ' + userAuth.user.accessToken,
                                },
                            });
                            if (orderItem.status != 201) {
                                console.warn('Error: ' + orderItem.statusText);
                            }
                        }
                    }
                } else {
                    throw createError({
                        statusCode: 500,
                        statusMessage: 'Error occurred creating order',
                    });
                }
            } catch (e) {
                console.warn(e);
            } finally {
                this.clearCart();
            }
        }
    },
    persist: true,
});