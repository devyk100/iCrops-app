import { configureStore } from '@reduxjs/toolkit'
import dataFormReducer from '../features/DataCollectionSlice'
import LocationReducer from '../features/LocationSlice'
import UIReducer from '../features/UISlice'

export default configureStore({
  reducer: {
    dataform: dataFormReducer,
    location: LocationReducer,
    ui: UIReducer
  }
})