import { Addon, Food, Option, RestaurantForCustomer, Variation } from "../../../graphql/generated";

export interface SelectedVariation extends Variation {
    addons: Addon[]
}

export interface CartState {
    cartItems: CartItem[]
    restaurant?: RestaurantForCustomer
}

export type CartItem = {
    selectedVariation: SelectedVariation | undefined,
    // selectedAddon: Addon | undefined,
    // selectedOption: Option[]
    food: Omit<Food, 'variations'>
    quantity: number
    timestamp: number
}

export type CartPayload = {
    item: CartItem
    restaurant: RestaurantForCustomer
}

export type UpdateQtyPayload = {
    qty: number
    timestamp: number
}