import {ICartItem} from "./ICartItem";

export interface ICartState {
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