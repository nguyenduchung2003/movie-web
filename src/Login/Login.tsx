import { useEffect, useState } from "react"
import {
     useDispatch,
     // , useSelector
} from "react-redux"
import {
     // login,
     // loginUsersAuthen,
     // registerUsersAuthenToken,
     accessToken,
} from "../Slice/SliceAction"
import {
     AppDispatch,
     // , RootState
} from "../Store/store"
import { NavLink, useNavigate } from "react-router-dom"

import { Formik, Form, ErrorMessage } from "formik"
// import useSchemas from "../Validate/Validate"

import {
     Button,
     TextField,
     Box,
     Typography,
     InputAdornment,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useSelector } from "react-redux"
import { RootState } from "../Store/store"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { ListMovieFavorites } from "../axios/customAxios"
const Login = () => {
     const navigate = useNavigate()
     // const dispatch = useDispatch<AppDispatch>()
     // const tokenUser = useSelector(
     //      (state: RootState) => state.accountSlice.token
     // )
     const [checkEye, setCheckEye] = useState<boolean>(true)

     interface MyFormValues {
          email: string
          password: string
          sessionId: string
     }
     interface userNow {
          userName: string
          passWord: string
          sessionId: string
          status: boolean
     }
     // interface registerUsersAuthenToken {
     //           payload
     // }
     const initialValues: MyFormValues = {
          email: "",
          password: "",
          sessionId: "",
     }
     // const dataSelectorToken = useSelector(
     //      (state: RootState) => state.accountSlice.token
     // )
     const dispatch = useDispatch<AppDispatch>()
     const dataSelectorSessionId = useSelector(
          (state: RootState) => state.accountSlice.sessionId
     )
     console.log(dataSelectorSessionId)
     // const [sessionId1, setSessionId1] = useState("")
     useEffect(() => {
          async function z() {
               const token = JSON.parse(localStorage.getItem("token") || "[]")

               // const user = JSON.parse(localStorage.getItem("users") || "[]")

               // console.log(user)

               //const y = await dispatch(registerUsersAuthenToken(String(x)))
               // const y =
               await dispatch(accessToken(String(token)))
               // console.log(y)
               // await setSessionId1(y.payload?.access_token)
               // console.log(y)
          }
          z()
     }, [dispatch])
     const access_token = useSelector(
          (state: RootState) => state.accountSlice.access_token as string
     )
     return (
          <>
               <Box className="boxFormik ">
                    <ToastContainer />
                    <Formik
                         initialValues={initialValues}
                         // validationSchema={useSchemas}
                         onSubmit={async (values, actions) => {
                              console.log(actions)
                              console.log(values)
                              // const user = {
                              //      userName: values.email,
                              //      passWord: values.password,
                              //      request_token: sessionId1,
                              // }
                              const storedData: userNow[] = JSON.parse(
                                   localStorage.getItem("users") as string
                              )
                              // console.log(storedData)
                              // const tokenLocal = JSON.parse(
                              //      localStorage.getItem("token") || "[]"
                              // )
                              // console.log(tokenLocal)
                              if (storedData !== null) {
                                   storedData.forEach((value) => {
                                        if (
                                             value.userName == values.email &&
                                             value.passWord ==
                                                  values.password &&
                                             value.sessionId == ""
                                        ) {
                                             console.log(access_token)
                                             value.sessionId = access_token
                                             value.status = true
                                             navigate("/movie-web/homePage")
                                        } else if (
                                             value.userName == values.email &&
                                             value.passWord ==
                                                  values.password &&
                                             value.sessionId != ""
                                        ) {
                                             value.status = true
                                             navigate("/movie-web/homePage")
                                        } else {
                                             console.log(
                                                  "Fail to update session"
                                             )
                                             // alert(
                                             //      "Tài khoản hoặc mật khẩu không đúng"
                                             // )
                                        }
                                   })
                                   if (
                                        !storedData.some(
                                             (value) =>
                                                  value.userName ==
                                                       values.email &&
                                                  value.passWord ==
                                                       values.password
                                        )
                                   ) {
                                        toast.error(
                                             "Tai khoan hoac mat khau khong chinh xac",
                                             {
                                                  position: "top-right",
                                                  autoClose: 3000,
                                                  hideProgressBar: false,
                                                  closeOnClick: true,
                                                  pauseOnHover: true,
                                                  draggable: true,
                                                  progress: undefined,
                                                  theme: "light",
                                             }
                                        )
                                   }
                                   localStorage.setItem(
                                        "users",
                                        JSON.stringify(storedData)
                                   )
                              } else {
                                   toast.error(
                                        "Tai khoan hoac mat khau khong chinh xac",
                                        {
                                             position: "top-right",
                                             autoClose: 3000,
                                             hideProgressBar: false,
                                             closeOnClick: true,
                                             pauseOnHover: true,
                                             draggable: true,
                                             progress: undefined,
                                             theme: "light",
                                        }
                                   )
                                   console.log("No users local storage")
                              }

                              // console.log(storedData)

                              // const x = await dispatch(login(user))
                              // const x = dispatch(loginUsersAuthen(user))
                              // console.log(x)
                              // if (x.payload !== undefined) {

                              // } else {
                              //      alert(
                              //           "Tài khoản hoặc mật khẩu không chính xác"
                              //      )
                              // }
                              actions.setSubmitting(false)
                         }}
                    >
                         {(formikProps) => (
                              <Form className="bg-[rgba(0,0,0,.75)] w-[500px] h-[80%] shadow-lg shadow-cyan-500/50 flex flex-col gap-[50px] justify-center items-center">
                                   <Typography
                                        variant="h3"
                                        className="text-white relative "
                                   >
                                        Login
                                   </Typography>
                                   <Box className=" w-[70%] h-[50px]">
                                        <TextField
                                             variant="outlined"
                                             label="Email"
                                             value={
                                                  formikProps.values.email !==
                                                  undefined
                                                       ? formikProps.values
                                                              .email
                                                       : ""
                                             }
                                             name="email"
                                             className="border-2 bg-[#333] rounded w-full"
                                             onChange={formikProps.handleChange}
                                             onBlur={formikProps.handleBlur}
                                             error={
                                                  formikProps.touched.email &&
                                                  Boolean(
                                                       formikProps.errors.email
                                                  )
                                             }
                                             inputProps={{
                                                  style: {
                                                       color: "white",
                                                  },
                                             }}
                                             InputLabelProps={{
                                                  style: { color: "white" },
                                             }}
                                             autoComplete="off"
                                        />
                                        <ErrorMessage name="email">
                                             {(msg) => (
                                                  <Typography className="text-lg text-red-600">
                                                       {msg}
                                                  </Typography>
                                             )}
                                        </ErrorMessage>
                                   </Box>
                                   <Box className=" w-[70%] h-[50px]">
                                        <TextField
                                             variant="outlined"
                                             label="Password"
                                             type={
                                                  checkEye ? "password" : "text"
                                             }
                                             value={
                                                  formikProps.values
                                                       .password !== undefined
                                                       ? formikProps.values
                                                              .password
                                                       : ""
                                             }
                                             name="password"
                                             className="border-2 bg-[#333] rounded w-full"
                                             onChange={formikProps.handleChange}
                                             onBlur={formikProps.handleBlur}
                                             error={
                                                  formikProps.touched
                                                       .password &&
                                                  Boolean(
                                                       formikProps.errors
                                                            .password
                                                  )
                                             }
                                             InputProps={{
                                                  style: {
                                                       color: "white",
                                                  },
                                                  endAdornment: (
                                                       <InputAdornment
                                                            position="start"
                                                            onClick={() => {
                                                                 setCheckEye(
                                                                      !checkEye
                                                                 )
                                                            }}
                                                       >
                                                            {checkEye ? (
                                                                 <VisibilityIcon />
                                                            ) : (
                                                                 <VisibilityOffIcon />
                                                            )}
                                                       </InputAdornment>
                                                  ),
                                             }}
                                             InputLabelProps={{
                                                  style: { color: "white" },
                                             }}
                                             autoComplete="off"
                                        />
                                        <ErrorMessage name="password">
                                             {(msg) => (
                                                  <Typography className="text-lg text-red-600">
                                                       {msg}
                                                  </Typography>
                                             )}
                                        </ErrorMessage>
                                   </Box>

                                   <Button
                                        type="submit"
                                        variant="contained"
                                        className="rounded w-[70%]  h-[50px] "
                                        color="error"
                                   >
                                        Login
                                   </Button>
                                   <Typography className="text-white ">
                                        Tôi chưa có tài khoản
                                        <NavLink
                                             to="/register"
                                             className="text-red-600 relative left-5"
                                        >
                                             Đăng kí
                                        </NavLink>
                                   </Typography>
                              </Form>
                         )}
                    </Formik>
               </Box>
          </>
     )
}

export default Login
