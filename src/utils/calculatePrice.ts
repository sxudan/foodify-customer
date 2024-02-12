import { CartItem } from "../screens/cart/store/cartTypes";

export const calculatePrice = (item: CartItem) => {
    const mainPrice = item.selectedVariation?.price ?? 0;
    const options = item.selectedVariation?.addons.filter(a => a && a.options).map(addon => addon.options).flat().filter(f => f) ?? []
    const addonsPrice = options.map(o => o?.price ?? 0).reduce((a, c) => a + c , 0);
    return (mainPrice + addonsPrice) * item.quantity;
};