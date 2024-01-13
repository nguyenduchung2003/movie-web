import {
     //  useEffect, useRef,
     useState,
     useEffect,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import {
     // register,
     // registerUser,
     requestToken,
     // registerUsersAuthenToken,
} from "../Slice/SliceAction"
import { AppDispatch, RootState } from "../Store/store"
import {
     NavLink,
     // , useNavigate
} from "react-router-dom"

import { Formik, Form, ErrorMessage } from "formik"
import { useSchemasRegister } from "../Validate/Validate"

import {
     Button,
     TextField,
     Box,
     Typography,
     InputAdornment,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { userType } from "../types/User"
import "./register.css"

const Register = () => {
     const [checkEye, setCheckEye] = useState<boolean>(true)
     const [checkEyeConfirm, setCheckEyeConfirm] = useState<boolean>(true)
     // const dataSelector = useSelector(
     //      (state: RootState) => state.accountSlice.token
     // )
     // const dataSelectorSessionId = useSelector(
     //      (state: RootState) => state.accountSlice.sessionId
     // )
     //const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     // const dataMovie = useSelector((state: RootState) => {

     // })

     interface MyFormValues {
          email: string
          password: string
          passwordConfirm: string
     }
     const initialValues: MyFormValues = {
          email: "",
          password: "",
          passwordConfirm: "",
     }
     useEffect(() => {
          dispatch(requestToken())
     }, [dispatch])
     const actionTokenNew = useSelector(
          (state: RootState) => state.accountSlice.request_token as string
     )
     return (
          <Box className="boxFormik ">
               <Formik
                    initialValues={initialValues}
                    validationSchema={useSchemasRegister}
                    onSubmit={async (values, actions) => {
                         //dispatch(register(user))
                         // const actionTokenNew = await dispatch(registerUser())
                         // const actionTokenNew = await dispatch(requestToken())
                         const newUser = {
                              userName: values.email,
                              passWord: values.password,
                              listMovieId: [],
                              sessionId: "",
                              status: false,
                         }

                         // const usersFromLocalStorage: userType[] = JSON.parse(
                         //      localStorage.getItem("users")
                         // )
                         let usersFromLocalStorage: userType[] = []
                         const storedData = localStorage.getItem("users")

                         if (storedData !== null) {
                              usersFromLocalStorage = JSON.parse(storedData)
                         } else {
                              console.log(1)
                         }

                         // const users = []
                         // users.push(user)

                         const updatedUsers = [
                              ...usersFromLocalStorage,
                              newUser,
                         ]
                         localStorage.setItem(
                              "users",
                              JSON.stringify(updatedUsers)
                         )
                         // actions.resetForm()
                         // if (!x) {
                         //      localStorage.setItem(
                         //           "user",
                         //           JSON.stringify([...x])
                         //      )
                         // } else {
                         //      localStorage.setItem(
                         //           "user",
                         //           JSON.stringify([...x, user])
                         //      )
                         // }

                         // console.log(actionTokenNew.payload)
                         // localStorage.setItem(
                         //      "token",
                         //      JSON.stringify(actionTokenNew.payload)
                         // )

                         localStorage.setItem(
                              "token",
                              JSON.stringify(actionTokenNew)
                         )

                         //window.location.href = `https://www.themoviedb.org/authenticate/${actionTokenNew.payload}?redirect_to=http://localhost:5173/login`
                         window.location.href = `https://www.themoviedb.org/auth/access?request_token=${actionTokenNew}`
                         // if (actionTokenNew.payload) {
                         //      const x = await dispatch(
                         //           registerUsersAuthenToken(
                         //                String(actionTokenNew.payload)
                         //           )
                         //      )
                         //      console.log(x)
                         // }
                         // console.log(1)
                         // console.log(dataSelectorSessionId)
                         // if (actionTokenNew.payload) {
                         //      const user = {
                         //           userName: values.email,
                         //           passWord: values.password,
                         //           sessionId: actionTokenNew.payload,
                         //      }
                         //      localStorage.setItem("user", JSON.stringify(user))
                         // }

                         // .then(() => {
                         //      console.log(dataSelector)
                         //      if (dataSelector) {
                         //           window.location.href = `https://www.themoviedb.org/authenticate/${dataSelector}?redirect_to=http://127.0.0.1:5173/login`
                         //      } else {

                         //           console.log("No have token")
                         //      }
                         // })

                         // navigate("/login")

                         actions.setSubmitting(false)
                    }}
               >
                    {(formikProps) => (
                         <Form className="bg-[rgba(0,0,0,.75)] w-[500px] h-[80%] shadow-lg shadow-cyan-500/50 flex flex-col gap-[50px] justify-center items-center">
                              <Typography
                                   variant="h3"
                                   className="text-white relative "
                              >
                                   Register
                              </Typography>
                              <Box className=" w-[70%] h-[50px]">
                                   <TextField
                                        variant="outlined"
                                        label="Email"
                                        value={
                                             formikProps.values.email !==
                                             undefined
                                                  ? formikProps.values.email
                                                  : ""
                                        }
                                        name="email"
                                        className="border-2 bg-[#333] rounded w-full"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        error={
                                             formikProps.touched.email &&
                                             Boolean(formikProps.errors.email)
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
                                        type={checkEye ? "password" : "text"}
                                        value={
                                             formikProps.values.password !==
                                             undefined
                                                  ? formikProps.values.password
                                                  : ""
                                        }
                                        name="password"
                                        className="border-2 bg-[#333] rounded w-full"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        error={
                                             formikProps.touched.password &&
                                             Boolean(
                                                  formikProps.errors.password
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
                              <Box className=" w-[70%] h-[50px]">
                                   <TextField
                                        variant="outlined"
                                        label="Password confirm"
                                        type={
                                             checkEyeConfirm
                                                  ? "password"
                                                  : "text"
                                        }
                                        value={
                                             formikProps.values
                                                  .passwordConfirm !== undefined
                                                  ? formikProps.values
                                                         .passwordConfirm
                                                  : ""
                                        }
                                        name="passwordConfirm"
                                        className="border-2 bg-[#333] rounded w-full"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        error={
                                             formikProps.touched
                                                  .passwordConfirm &&
                                             Boolean(
                                                  formikProps.errors
                                                       .passwordConfirm
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
                                                            setCheckEyeConfirm(
                                                                 !checkEyeConfirm
                                                            )
                                                       }}
                                                  >
                                                       {checkEyeConfirm ? (
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
                                   <ErrorMessage name="passwordConfirm">
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
                                   Register
                              </Button>
                              <Typography className="text-white ">
                                   Tôi đã có tài khoản
                                   <NavLink
                                        to="/movie-web/login"
                                        className="text-red-600 relative left-5"
                                   >
                                        Đăng nhập
                                   </NavLink>
                              </Typography>
                         </Form>
                    )}
               </Formik>
          </Box>
     )
}
export default Register
