import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import accountSlice from "../Slice/SliceAction"
import pageMovie from "../Slice/SliceMovie"
import seachMovie from "../Slice/SliceSeachMovie"
import favoriteMovie from "../Slice/SliceMovieFavorite"
const store = configureStore({
     reducer: {
          accountSlice: accountSlice,
          pageMovie: pageMovie,
          seachMovie: seachMovie,
          favoriteMovie: favoriteMovie,
     },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const AppUseDispatch = () => useDispatch<AppDispatch>()

export default store
