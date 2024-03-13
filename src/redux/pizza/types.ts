export type Pizza = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
  }

  export type SearchPizzaParams = {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: string
  }
  
  
  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }
  
  export interface PizzaSliceState {
    items: Pizza[]
    status: Status
  }