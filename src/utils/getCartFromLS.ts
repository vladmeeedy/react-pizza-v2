import { CartItem } from "../redux/cart/types";
import calcTotalPrise from "./calcTotalPrise";

export function getCartFromLS() {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrise(items)

    return {
        items: items as CartItem[],
        totalPrice,
    }

   
}

export default getCartFromLS;