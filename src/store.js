import { configureStore } from '@reduxjs/toolkit'
import FeatureReducer from './redux.jsx/slices/FeatureSlice'

const store = configureStore({
  reducer: {
    features: FeatureReducer,
  },
})

export default store
