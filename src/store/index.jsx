import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
// sin llaves el productsSlice

export default configureStore({
  reducer: {
    products: productsSlice,
    isLoading: isLoadingSlice,
  }
})


//store en index.jsx