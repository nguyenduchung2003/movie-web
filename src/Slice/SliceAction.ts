import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { instanceAuthen, RequestTokenV4 } from "../axios/customAxios"
interface user {
     id?: string
     userName: string
     passWord: string
     likeMovie?: Array<string>
     request_token?: string
}

interface UsersState {
     user?: user
     loading?: "idle" | "pending" | "succeeded" | "failed"
     token?: string
     sessionId?: string
     request_token?: string
     access_token?: string
}
const initialState: UsersState = {
     user: {
          id: "",
          userName: "",
          passWord: "",
          request_token: "",
          likeMovie: [],
     },
     token: "",
     loading: "idle",
     sessionId: "",
     request_token: "",
     access_token: "",
}
interface MyResponse {
     request_token?: string
     token?: string
}
interface MyResponseV4 {
     status_message: string
     request_token: string
     success: boolean
     status_code: number
}
interface MyResponseAccessTokenV4 {
     access_token?: string
     status_code: number
     status_message: string
     success: boolean
}

export const newToken = createAsyncThunk("account/loginUsers", async () => {
     try {
          const response: AxiosResponse<MyResponse> = await instanceAuthen.get(
               "new"
          )

          const token = response.data.request_token

          // document.cookie = `token = ${token}`
          return token
     } catch (error) {
          throw new Error()
     }
})

export const registerUsersAuthenToken = createAsyncThunk(
     "account/registerUsersAuthenToken",
     async (token: string) => {
          try {
               const response: AxiosResponse<MyResponse> =
                    await instanceAuthen.post(
                         "session/new",

                         {
                              request_token: token,
                         }
                    )

               const sessionId = response.data
               console.log(response)
               // document.cookie = `token = ${token}`
               return sessionId
          } catch (error) {
               throw new Error()
          }
     }
)
export const registerUser = createAsyncThunk(
     "account/registerUsers",
     async () => {
          try {
               const response: AxiosResponse<MyResponse> =
                    await instanceAuthen.get("token/new")

               const token = response.data.request_token
               //   console.log(token)
               // document.cookie = `token = ${token}`
               return token
          } catch (error) {
               throw new Error()
          }
     }
)
export const registerUserAuthen = createAsyncThunk(
     "account/registerUserAuthen",
     async () => {
          try {
               const response: AxiosResponse<MyResponse> =
                    await instanceAuthen.get("token/new")

               const token = response.data.request_token

               // document.cookie = `token = ${token}`
               return token
          } catch (error) {
               throw new Error()
          }
     }
)
export const register = createAsyncThunk(
     "account/registerUser",
     async (user: user) => {
          try {
               const response: AxiosResponse<MyResponse> = await axios.post(
                    "//localhost:8081/register",
                    {
                         userName: user.userName,
                         passWord: user.passWord,
                    }
               )

               const data = response.data
               // console.log("Register", data)

               return data
          } catch (error) {
               throw new Error()
          }
     }
)
export const requestToken = createAsyncThunk(
     "account/requestToken",
     async () => {
          try {
               const response: AxiosResponse<MyResponseV4> =
                    await RequestTokenV4.post("auth/request_token", {
                         redirect_to: "http://localhost:5173/movie-web/login",
                    })

               const data = response.data
               // console.log("Register", data)

               return data
          } catch (error) {
               throw new Error()
          }
     }
)
export const accessToken = createAsyncThunk(
     "account/accessToken",
     async (request_token: string) => {
          try {
               const response: AxiosResponse<MyResponseAccessTokenV4> =
                    await RequestTokenV4.post("auth/access_token", {
                         request_token: request_token,
                    })

               const data = response.data
               // console.log("Register", data)

               return data
          } catch (error) {
               throw new Error()
          }
     }
)

const slice = createSlice({
     name: "account",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder

               .addCase(register.fulfilled, (state) => {
                    // console.log(action.payload)
                    state.loading = "succeeded"
               })

               .addCase(registerUser.fulfilled, (state, action) => {
                    state.token = action.payload
                    state.loading = "succeeded"
               })

               .addCase(registerUsersAuthenToken.fulfilled, (state, action) => {
                    state.sessionId = action.payload.request_token
                    state.loading = "succeeded"
               })
               .addCase(requestToken.fulfilled, (state, action) => {
                    state.request_token = action.payload.request_token
                    state.loading = "succeeded"
               })
               .addCase(accessToken.fulfilled, (state, action) => {
                    state.access_token = action.payload.access_token
                    state.loading = "succeeded"
               })
          // .addCase(
          //      readData.fulfilled,
          //      (state, action: PayloadAction<user>) => {
          //           state.token = action.payload
          //           state.loading = "succeeded"
          //      }
          // )
     },
})

export default slice.reducer
