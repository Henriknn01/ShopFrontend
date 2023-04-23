import {loadStripe} from "@stripe/stripe-js"
import {defineStore} from "pinia";

interface ICartItem {
    id: number;
    name: string;
    desc: string;
    img: string;
    imgAlt: string;
    price: number;
    quantity: number;
    link: string;
}

interface ICartState {
    cart: ICartItem[];
    cartCount: number;
    fixedShippingCost: number;
    freeShippingThreshold: number;
    shipping: number;
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
    stripeSessionID: string,
}

interface ILineItem {
    price_data: {
        currency: string,
        product_data: {
            name: string,
            images: string[],
        },
        unit_amount: number,
    },
    quantity: number,
}

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
            fixedShippingCost: 5,
            freeShippingThreshold: 100,
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

        clearCart() {
            this.cart = [];
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
            //const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
            // const body = this.cart;
            const headers = {
                "Content-Type": 'multipart/form-data',
            };

            let mappedArr = this.cart.map(item=> {
                return <ILineItem> {
                    price_data: {
                        currency: 'nok',
                        product_data: {
                            name: item.name,
                            images: [item.img],
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
            console.log(session)
            window.location.replace(session.url);
        },

        /*
        async expirePaymentSession() {
            const session = await stripe.checkout.sessions.expire();
        }
        */
    },
    persist: true,
})