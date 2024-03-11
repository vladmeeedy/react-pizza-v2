import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import getCartFromLS from '../../utils/getCartFromLS'
import calcTotalPrise from '../../utils/calcTotalPrise'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

const {items, totalPrice}= getCartFromLS()

const initialState: CartSliceState = {
  items,
  totalPrice,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id)
      if (findItems) {
        findItems.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = calcTotalPrise(state.items)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem && findItem.count > 1) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
