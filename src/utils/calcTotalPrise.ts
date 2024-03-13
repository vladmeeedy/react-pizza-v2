import { CartItem } from '../redux/cart/types'

const calcTotalPrise = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

export default calcTotalPrise
