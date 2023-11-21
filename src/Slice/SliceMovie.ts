import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import {
     //  instanceMovie,
     instanceMovie2,
     api_key,
} from "../axios/customAxios"
import {
     // movieDeital,
     // dataPage,
     resultsMovie,
     pageMovieType,
     detailMovieType,
     trailerMovieType,
     castMovieType,
} from "../types/Movie"

// interface ServerData {
//      name?: string
//      slug?: string
//      filename?: string
//      link_embed?: string
//      link_m3u8?: string
// }
// interface Episodes {
//      server_data: ServerData[]
//      server_name: string
// }

interface UsersState {
     movie?: resultsMovie[]
     movieDeital?: detailMovieType
     trailerMovie?: trailerMovieType
     casts?: castMovieType
     movieSimilar?: resultsMovie[]
     // allMoviePage?: resultsMovie[]
     loading?: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: UsersState = {
     movie: [],
     movieSimilar: [],
     movieDeital: {},
     trailerMovie: {},
     casts: {},
     loading: "idle",
}

// interface AxiosResponseMovie {
//      items: []
//      pagination?: object
//      pathImage: string
//      status: boolean
// }
// interface AxiosResponseMovieDetail {
//      episodes: []
//      movie?: object
//      msg: string
//      status: boolean
// }

// export const pageMovie2 = createAsyncThunk(
//      "movie/pageMovie",
//      async (page: number) => {
//           try {
//                const response: AxiosResponse<AxiosResponseMovie, number> =
//                     await instanceMovie.get(
//                          `danh-sach/phim-moi-cap-nhat?page=${page}`
//                     )
//                const data = response.data
//
//                return data
//           } catch (error) {
//                console.log(error)
//           }
//      }
// )

// async function slugFound(slug: string) {
//      try {
//           const response: AxiosResponse<AxiosResponseMovieDetail, number> =
//                await instanceMovie.get(`phim/${slug}`)
//           const data = response.data
//
//           return data
//      } catch (error) {
//           console.log(error)
//      }
// }

export const detailMovie = createAsyncThunk(
     "movie/detailMovie",
     async (id: number) => {
          try {
               const response: AxiosResponse<detailMovieType, number> =
                    await instanceMovie2.get(`${id}`, {
                         params: {
                              api_key: api_key,
                         },
                    })
               const data = response.data
               // console.log(data)
               return data
          } catch (error) {
               console.log(error)
          }
     }
     // slugFound
)
export const pageMovie = createAsyncThunk(
     "movie/detailMovie2",
     async (page: number) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovie2.get(`now_playing`, {
                         params: {
                              language: "en-US",
                              page: page,
                              api_key: api_key,
                         },
                    })
               const data = response.data

               return data
          } catch (error) {
               console.log(error)
          }
     }
     // slugFound
)

export const trailerMovie = createAsyncThunk(
     "movie/trailerMovie",
     async (id: number) => {
          try {
               const response: AxiosResponse<trailerMovieType, number> =
                    await instanceMovie2.get(`${id}/videos`, {
                         params: { language: "en-US", api_key: api_key },
                    })
               const data = response.data

               return data
          } catch (error) {
               console.log(error)
          }
     }
)

export const castsMovie = createAsyncThunk(
     "movie/castMovie",
     async (id: number) => {
          try {
               const response: AxiosResponse<castMovieType, number> =
                    await instanceMovie2.get(`${id}/casts`, {
                         params: { language: "en-US", api_key: api_key },
                    })
               const data = response.data

               return data
          } catch (error) {
               console.log(error)
          }
     }
)

export const similarMovie = createAsyncThunk(
     "movie/similarMovie",
     async (id: number) => {
          try {
               const response: AxiosResponse<pageMovieType, number> =
                    await instanceMovie2.get(`${id}/similar`, {
                         params: { language: "en-US", api_key: api_key },
                    })
               const data = response.data

               return data
          } catch (error) {
               console.log(error)
          }
     }
)

const slice = createSlice({
     name: "movie",
     initialState,
     reducers: {
          // receivedAll: {
          //      reducer(
          //           state,
          //           action
          //           // : PayloadAction<
          //           //      Page[],
          //           //      string,
          //           //      { currentPage: number }
          //           // >
          //      ) {
          //           const pageSlug = state.movie?.map((movie) => movie.slug)
          //      },
          //      // prepare(state:dataPage[]) {
          //      //      state.movie.map((movie)=>movie.slug)
          //      //      return { payload, meta: { currentPage } }
          //      // },
          // },
     },
     extraReducers: (builder) => {
          builder
               .addCase(pageMovie.pending, (state) => {
                    state.loading = "pending"
               })
               .addCase(pageMovie.fulfilled, (state, action) => {
                    // console.log(action.payload?.results)
                    state.movie = action.payload?.results
                    state.loading = "succeeded"
               })
               .addCase(detailMovie.fulfilled, (state, action) => {
                    state.movieDeital = action.payload
                    state.loading = "succeeded"
               })
               .addCase(trailerMovie.fulfilled, (state, action) => {
                    state.trailerMovie = action.payload
                    state.loading = "succeeded"
               })
               .addCase(castsMovie.fulfilled, (state, action) => {
                    state.casts = action.payload
                    state.loading = "succeeded"
               })
               .addCase(similarMovie.fulfilled, (state, action) => {
                    state.movieSimilar = action.payload?.results
                    state.loading = "succeeded"
               })
     },
})

export default slice.reducer
