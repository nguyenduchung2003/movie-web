import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import {
     //  instanceMovie,
     instanceMovie2,
     instanceMovieTrending,
     instanceMovieDiscover,
     instanceMovieSearch,
     instanceMovieGenre,
     api_key,
} from "../axios/customAxios"
import {
     // movieDeital,
     // dataPage,
     resultsMovie,
     pageMovieType,
} from "../types/Movie"
interface GenreType {
     id: number
     name: string
}
interface GenreTypes {
     genres: GenreType[]
}
interface UsersState {
     moviePopular?: resultsMovie[]
     movieTopRate?: resultsMovie[]
     movieUpcoming?: resultsMovie[]
     movieTrending?: resultsMovie[]
     movieGenres?: resultsMovie[]
     movieSeach?: resultsMovie[]
     moviePTU?: resultsMovie[]
     genreList?: GenreType[]
     numberPage?: number
     loading?: "idle" | "pending" | "succeeded" | "failed"
}

function functionCreateAsyncThunk(title: string, url: string) {
     return createAsyncThunk(`seachMovie/${title}`, async (id: number = 1) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovie2.get(`${url}`, {
                         params: {
                              language: "en-US",
                              page: id,
                              api_key: api_key,
                         },
                    })
               const data = response.data
               return data
          } catch (error) {
               if (typeof error == "string") {
                    throw new Error(error)
               }
          }
     })
}
// export const movieTopRate = createAsyncThunk(
//      `seachMovie/movieTopRate`,
//      async (id: number) => {
//           try {
//                const response: AxiosResponse<pageMovieType, number> =
//                     await instanceMovie2.get(`top_rated`, {
//                          params: { language: "en-US", page: id },
//                     })
//                const data = response.data
//                return data
//           } catch (error) {
//                console.log(error)
//           }
//      }
// )
export const movieTrending = createAsyncThunk(
     `seachMovie/movieTrending`,
     async (id: number) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovieTrending.get(`week`, {
                         params: {
                              language: "en-US",
                              page: id,
                              api_key: api_key,
                         },
                    })
               const data = response.data
               return data
          } catch (error) {
               if (typeof error == "string") {
                    throw new Error(error)
               }
          }
     }
)
export const seacheMovieGenres = createAsyncThunk(
     "seachMovie/seacheMovieGenres",
     async ({ idPage, idGenres }: { idPage: number; idGenres: string }) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovieDiscover.get("movie", {
                         params: {
                              include_adult: "false",
                              include_video: "false",
                              language: "en-US",
                              page: idPage,
                              sort_by: "popularity.desc",
                              with_genres: idGenres,
                              api_key: api_key,
                         },
                    })
               // console.log(response)
               const data = response.data
               return data
          } catch (error) {
               if (typeof error == "string") {
                    throw new Error(error)
               }
          }
     }
)

export const seacheMovieSearch = createAsyncThunk(
     "seachMovie/seacheMovieSearch",
     async ({ idPage, content }: { idPage: number; content: string }) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovieSearch.get("movie", {
                         params: {
                              query: content,
                              include_adult: "false",
                              language: "en-US",
                              page: idPage,
                              api_key: api_key,
                         },
                    })
               // console.log(response)
               const data = response.data
               return data
          } catch (error) {
               if (typeof error == "string") {
                    throw new Error(error)
               }
          }
     }
)
export const MovieGenresType = createAsyncThunk(
     "seachMovie/MovieGenresType",
     async () => {
          try {
               const response: AxiosResponse<GenreTypes, number> =
                    await instanceMovieGenre.get("list", {
                         params: { api_key: api_key },
                    })

               const data = response.data
               return data
          } catch (error) {
               if (typeof error == "string") {
                    throw new Error(error)
               }
          }
     }
)

export const moviePopular = functionCreateAsyncThunk("moviePopular", "popular")
export const movieTopRate = functionCreateAsyncThunk(
     "movieTopRate",
     "top_rated"
)
export const movieUpcoming = functionCreateAsyncThunk(
     "movieUpcoming",
     "upcoming"
)

const initialState: UsersState = {
     moviePopular: [],
     movieTopRate: [],
     movieUpcoming: [],
     movieTrending: [],
     movieGenres: [],
     movieSeach: [],
     moviePTU: [],
     genreList: [],
     numberPage: 0,
     loading: "idle",
}
const slice = createSlice({
     name: "seachMovie",
     initialState,
     reducers: {
          moviePTU(state, action) {
               const { title } = action.payload
               switch (title) {
                    case "Popular Movie":
                         state.moviePTU = state.moviePopular
                         break
                    case "Top Rate Movie":
                         state.moviePTU = state.movieTopRate
                         break
                    case "Upcoming Movie":
                         state.moviePTU = state.movieUpcoming
                         break
                    default:
                         break
               }
          },
     },
     extraReducers(builder) {
          builder
               .addCase(moviePopular.pending, (state) => {
                    state.loading = "pending"
               })
               .addCase(moviePopular.fulfilled, (state, action) => {
                    state.moviePopular = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(movieTopRate.fulfilled, (state, action) => {
                    state.movieTopRate = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(movieUpcoming.fulfilled, (state, action) => {
                    state.movieUpcoming = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(movieTrending.fulfilled, (state, action) => {
                    state.movieTrending = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(seacheMovieGenres.fulfilled, (state, action) => {
                    state.movieGenres = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(seacheMovieSearch.fulfilled, (state, action) => {
                    state.movieSeach = action.payload?.results
                    state.numberPage = action.payload?.total_pages
               })
               .addCase(MovieGenresType.fulfilled, (state, action) => {
                    state.genreList = action.payload?.genres
               })
     },
})

export const { moviePTU } = slice.actions

export default slice.reducer
