import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./slice/slice"
const store = configureStore({
  reducer: {
    data: dataSlice,
  }
})

export default store