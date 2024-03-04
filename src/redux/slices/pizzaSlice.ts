import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

interface PizzaSliceState {
  items: Pizza[]
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://65a92c59219bfa371868aad2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    return data
  },
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
