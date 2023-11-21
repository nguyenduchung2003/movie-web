import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
     resultsFavoriteMovie,
     favoriteMovieType,
     AddList,
     listMovieTypes,
     resultsMovie,
     detailMovieType,
} from "../types/Movie"
import { userType } from "../types/User"
import {
     ListMovieFavoritesV4,
     account_id,
     RequestTokenV4,
} from "../axios/customAxios"
import { AxiosResponse } from "axios"
interface initialState {
     resultsFavorite: favoriteMovieType[]
     resultsFavoriteFilter: resultsFavoriteMovie[]
     resultsFavoriteItems: listMovieTypes[]
}
const initialState: initialState = {
     resultsFavorite: [],
     resultsFavoriteFilter: [],
     resultsFavoriteItems: [],
}
// const storedData: userType[] = JSON.parse(localStorage.getItem("users") || "[]")

// const storeDataFilter = storedData.filter(
//      (user: userType) => user.status === true
// )
// const userObj = Object.assign({}, ...storeDataFilter)

export const listFavoriteMovie = createAsyncThunk(
     "moviesFavorite/listFavoriteMovie",
     async () => {
          try {
               const response: AxiosResponse<favoriteMovieType> =
                    await ListMovieFavoritesV4.get(
                         `account/${account_id}/lists`,
                         {
                              headers: {
                                   accept: "application/json",
                                   Authorization:
                                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
                              },
                         }
                    )
               const data = response.data

               return data
          } catch (error) {
               console.log(error)
          }
     }
)
export const listFavoriteMovieDetail = createAsyncThunk(
     "moviesFavorite/listFavoriteMovieDetail",
     async (arrayId: number[]) => {
          try {
               // console.log("userNow", userObj)
               // let arrayId: number[] = []
               // storedData.forEach((user: userType) => {
               //      if (user.status == true) {
               //           arrayId = user.listMovieId
               //      }
               // })
               console.log("arrayId", arrayId)
               const dataItem: listMovieTypes[] = []
               for (const listDetail of arrayId) {
                    if (listDetail) {
                         const response: AxiosResponse<listMovieTypes> =
                              await RequestTokenV4.get(`list/${listDetail}`, {
                                   signal: new AbortController().signal,
                              })
                         const data = response.data

                         dataItem.push(data)
                    }
               }
               console.log("dataItem", dataItem)
               return dataItem
          } catch (error) {
               // Handle errors if needed
               console.error(error)
          }
     }
)
interface resultsAddItemType {
     media_type: string
     media_id: number
     success: boolean
}
interface addItemType {
     status_message: string
     results: resultsAddItemType[]
     success: boolean
     status_code: number
}

// add item movie
export const FavoriteMovie = createAsyncThunk(
     "moviesFavorite/FavoriteMovie",
     async ({
          idList,
          idMovie,
          accessToken,
          dataDetail,
     }: {
          idList: number
          idMovie: number
          accessToken: string
          dataDetail: detailMovieType
     }) => {
          try {
               const response: AxiosResponse<addItemType> =
                    await ListMovieFavoritesV4.post(
                         `list/${idList}/items`,
                         {
                              items: [
                                   {
                                        media_type: "movie",
                                        media_id: idMovie,
                                   },
                              ],
                         },
                         {
                              headers: {
                                   accept: "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                    )
               const data = response.data
               console.log("Them thanh cong item", data)
               return { data: data, dataDetail: dataDetail, id: idList }
          } catch (error) {
               console.log(error)
          }
     }
)
export const addListMovie = createAsyncThunk(
     "moviesFavorite/addListMovie",
     async ({
          description,
          name,
          accessToken,
     }: {
          description: string
          name: string
          accessToken: string
     }) => {
          try {
               const response: AxiosResponse<listMovieTypes> =
                    await ListMovieFavoritesV4.post(
                         "list",
                         {
                              description: description,
                              name: name,
                              iso_3166_1: "US",
                              iso_639_1: "en",
                              public: true,
                         },
                         {
                              headers: {
                                   Accept: "application/json",
                                   "Content-Type": "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                    )
               const data = response.data

               return {
                    account_object_id: "65354c61c8a5ac011cf04449",
                    adult: 0,
                    average_rating: 0,
                    backdrop_path: null,
                    created_at: "2023-11-18 06:57:47 UTC",
                    description: description,
                    featured: 0,
                    id: data.id,
                    iso_3166_1: "US",
                    iso_639_1: "en",
                    name: name,
                    number_of_items: 0,
                    poster_path: null,
                    public: 1,
                    revenue: 0,
                    runtime: "0",
                    sort_by: 1,
                    updated_at: "2023-11-18 06:57:47 UTC",
               }
          } catch (error) {
               console.log(error)
          }
     }
)
export const deleteListMovie = createAsyncThunk(
     "moviesFavorite/deleteListMovie",
     async ({
          idList,
          accessToken,
     }: {
          idList: number
          accessToken: string
     }) => {
          try {
               const response: AxiosResponse<AddList> =
                    await ListMovieFavoritesV4.delete(`list/${idList}`, {
                         headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${accessToken}`,
                         },
                    })
               const data = response.data
               console.log(data)
               return idList
          } catch (error) {
               console.log(error)
          }
     }
)
interface updateList {
     success: boolean
     status_code: number
     status_message: string
     results?: []
}
export const updateListMovie = createAsyncThunk(
     "moviesFavorite/updateListMovie",
     async ({
          idList,
          accessToken,
          description,
          name,
     }: {
          idList: number
          accessToken: string
          description: string
          name: string
     }) => {
          try {
               const response: AxiosResponse<resultsFavoriteMovie> =
                    await ListMovieFavoritesV4.put(
                         `list/${idList}`,
                         {
                              description: description,
                              name: name,
                         },
                         {
                              headers: {
                                   Accept: "application/json",
                                   "Content-Type": "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                    )
               const data = response.data
               console.log(data)
               return {
                    account_object_id: "65354c61c8a5ac011cf04449",
                    adult: 0,
                    average_rating: 0,
                    backdrop_path: null,
                    created_at: "2023-11-18 06:57:47 UTC",
                    description: description,
                    featured: 0,
                    id: idList,
                    iso_3166_1: "US",
                    iso_639_1: "en",
                    name: name,
                    number_of_items: 0,
                    poster_path: null,
                    public: 1,
                    revenue: 0,
                    runtime: "0",
                    sort_by: 1,
                    updated_at: "2023-11-18 06:57:47 UTC",
               }
          } catch (error) {
               console.log(error)
          }
     }
)
export const updateCommentMovie = createAsyncThunk(
     "moviesFavorite/updateCommentMovie",
     async ({
          idList,
          accessToken,
          idMovie,
          comment,
     }: {
          idList: number
          accessToken: string
          idMovie: number
          comment: string
     }) => {
          try {
               const response: AxiosResponse<updateList> =
                    await ListMovieFavoritesV4.put(
                         `list/${idList}/items`,
                         {
                              items: [
                                   {
                                        media_type: "movie",
                                        media_id: idMovie,
                                        comment: comment,
                                   },
                              ],
                         },
                         {
                              headers: {
                                   Accept: "application/json",
                                   "Content-Type": "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                    )
               const data = response.data
               console.log(data)
               return {
                    idList: idList,
                    accessToken: accessToken,
                    idMovie: idMovie,
                    comment: comment,
               }
          } catch (error) {
               console.log(error)
          }
     }
)
export const deleteItem = createAsyncThunk(
     "moviesFavorite/deleteItem",
     async ({
          idList,
          accessToken,
          idMovie,
     }: {
          idList: number
          accessToken: string
          idMovie: number
     }) => {
          try {
               const response: AxiosResponse<updateList> =
                    await ListMovieFavoritesV4.delete(
                         `list/${idList}/items`,

                         {
                              headers: {
                                   Accept: "application/json",
                                   "Content-Type": "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                              data: {
                                   items: [
                                        {
                                             media_type: "movie",
                                             media_id: idMovie,
                                        },
                                   ],
                              },
                         }
                    )
               const data = response.data
               console.log(data)
               return {
                    idList: idList,
                    idMovie: idMovie,
               }
          } catch (error) {
               console.log(error)
          }
     }
)
export const clearItemList = createAsyncThunk(
     "moviesFavorite/clearItemList",
     async ({
          idList,
          accessToken,
     }: {
          idList: number
          accessToken: string
     }) => {
          try {
               const response: AxiosResponse<updateList> =
                    await ListMovieFavoritesV4.get(
                         `list/${idList}/clear`,

                         {
                              headers: {
                                   Accept: "application/json",
                                   "Content-Type": "application/json",
                                   Authorization: `Bearer ${accessToken}`,
                              },
                         }
                    )
               const data = response.data
               console.log(data)
               console.log(data)
               return idList
          } catch (error) {
               console.log(error)
          }
     }
)

// console.log(storedData)

// console.log(userObj)
const slice = createSlice({
     name: "moviesFavorite",
     initialState: initialState,
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(listFavoriteMovie.fulfilled, (state, action) => {
                    const storedData: userType[] = JSON.parse(
                         localStorage.getItem("users") || "[]"
                    )

                    const storeDataFilter = storedData.filter(
                         (user: userType) => user.status === true
                    )
                    const userObj = Object.assign({}, ...storeDataFilter)
                    const listMovie = userObj.listMovieId
                    const dataFilterArray: resultsFavoriteMovie[] = []
                    action.payload?.results.forEach(
                         (data: resultsFavoriteMovie) => {
                              listMovie?.forEach((listId: number) => {
                                   if (data.id === listId) {
                                        dataFilterArray.push(data)
                                   }
                              })
                         }
                    )
                    state.resultsFavoriteFilter = dataFilterArray
               })
               .addCase(addListMovie.fulfilled, (state, action) => {
                    const storedData: userType[] = JSON.parse(
                         localStorage.getItem("users") || "[]"
                    )

                    const data = action.payload?.id as number

                    const clonedStoredData = [...storedData]

                    clonedStoredData
                         .filter((user: userType) => user.status == true)
                         .forEach((user: userType) => {
                              user.listMovieId.push(data)
                         })
                    console.log("store local", clonedStoredData)

                    localStorage.setItem(
                         "users",
                         JSON.stringify(clonedStoredData)
                    )

                    state.resultsFavoriteItems.push(
                         action.payload as unknown as listMovieTypes
                    )
               })
               .addCase(deleteListMovie.fulfilled, (state, action) => {
                    const storedData: userType[] = JSON.parse(
                         localStorage.getItem("users") || "[]"
                    )

                    storedData.forEach((user: userType) => {
                         if (user.status == true) {
                              const index = user.listMovieId.indexOf(
                                   action.payload as number
                              )
                              user.listMovieId.splice(index, 1)
                         }
                    })

                    console.log("delete store", storedData)
                    localStorage.setItem("users", JSON.stringify(storedData))
                    state.resultsFavoriteItems =
                         state.resultsFavoriteItems.filter(
                              (listMovie) => listMovie.id != action.payload
                         )
               })
               .addCase(updateListMovie.fulfilled, (state, action) => {
                    state.resultsFavoriteItems.forEach((listMovie) => {
                         if (listMovie.id == action.payload?.id) {
                              listMovie.name = action.payload?.name as string
                              listMovie.description =
                                   action.payload?.description
                         }
                    })
                    // state.resultsFavoriteFilter.forEach((listMovie) => {
                    //      if (listMovie.id == action.payload?.id) {
                    //           listMovie.name = action.payload?.name as string
                    //           listMovie.description =
                    //                action.payload?.description
                    //      }
                    // })
               })
               .addCase(listFavoriteMovieDetail.fulfilled, (state, action) => {
                    state.resultsFavoriteItems =
                         action.payload as listMovieTypes[]
               })
               .addCase(clearItemList.fulfilled, (state, action) => {
                    state.resultsFavoriteItems.forEach((item) => {
                         if (item.id == action.payload) {
                              item.results = []
                              item.comments = {}
                         }
                    })
               })
               .addCase(deleteItem.fulfilled, (state, action) => {
                    state.resultsFavoriteItems.forEach((item) => {
                         if (item.id == action.payload?.idList) {
                              item.results = (
                                   item?.results as resultsMovie[]
                              ).filter(
                                   (listMovie) =>
                                        listMovie.id != action.payload?.idMovie
                              )
                         }
                    })
               })
               .addCase(FavoriteMovie.fulfilled, (state, action) => {
                    const newMovie: resultsMovie = {
                         adult: action.payload?.dataDetail.adult,
                         backdrop_path:
                              action.payload?.dataDetail.backdrop_path,
                         id: action.payload?.dataDetail.id,
                         title: action.payload?.dataDetail.original_title,
                         original_title:
                              action.payload?.dataDetail.original_title,
                         original_language:
                              action.payload?.dataDetail.original_language,
                         overview: action.payload?.dataDetail.overview,
                         poster_path: action.payload?.dataDetail.poster_path,
                         media_type: "movie",
                         genre_ids: action.payload?.dataDetail?.genres?.map(
                              (genre) => genre.id
                         ),
                         popularity: action.payload?.dataDetail.popularity,
                         release_date: action.payload?.dataDetail.release_date,
                         video: action.payload?.dataDetail.video,
                         vote_average: action.payload?.dataDetail.vote_average,
                         vote_count: action.payload?.dataDetail.vote_count,
                    }

                    if (
                         action.payload?.data.results.some(
                              (data) => data.success == true
                         )
                    ) {
                         // state.resultsFavoriteItems.forEach((item) => {
                         //      console.log("item", item.id)
                         //      console.log("payload", action.payload?.id)
                         //      if (item.id == action.payload?.id) {
                         //           console.log(action.payload?.id)
                         //           item.results?.push(newMovie as resultsMovie)
                         //      }
                         // })
                         console.log("new Movie", newMovie)
                         state.resultsFavoriteItems
                              .filter(
                                   (itemFilter) =>
                                        itemFilter.id == action.payload?.id
                              )
                              .forEach((item) => item.results?.push(newMovie))
                    }
               })
               .addCase(updateCommentMovie.fulfilled, (state, action) => {
                    state.resultsFavoriteItems.forEach((item) => {
                         item.results?.forEach((itemResults) => {
                              if (
                                   item.id == action.payload?.idList &&
                                   itemResults.id == action.payload?.idMovie
                              ) {
                                   item.comments = {
                                        ...item.comments,
                                        [`movie:${action.payload?.idMovie}`]:
                                             action.payload?.comment as string,
                                   }
                              }
                         })
                    })
               })
     },
})

export default slice.reducer
