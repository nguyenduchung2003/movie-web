import {
     List,
     ListItem,
     ListItemButton,
     // ListItemIcon,
     ListItemText,
     // Box,
     TextField,
     InputAdornment,
     Box,
     Divider,
} from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
// import axios from "axios"
import { useEffect, useMemo, useState } from "react"
// import { instanceMovie } from "../axios/customAxios"
import { useSelector, useDispatch } from "react-redux"
import {
     MovieGenresType,
     // , seacheMovieSearch
} from "../Slice/SliceSeachMovie"
import { useNavigate } from "react-router-dom"

import { AppDispatch, RootState } from "../Store/store"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { userType } from "../types/User"
import { ToastContainer, toast } from "react-toastify"
declare module "@mui/material/styles" {
     interface Palette {
          salmon: Palette["primary"]
     }

     interface PaletteOptions {
          salmon?: PaletteOptions["primary"]
     }
}

// Update the Button's color options to include a salmon option
declare module "@mui/material/Button" {
     interface ButtonPropsColorOverrides {
          salmon: true
     }
}
let theme = createTheme({
     // Theme customization goes here as usual, including tonalOffset and/or
     // contrastThreshold as the augmentColor() function relies on these
})

theme = createTheme(theme, {
     // Custom colors created with augmentColor go here
     palette: {
          salmon: theme.palette.augmentColor({
               color: {
                    main: "#FFFFFF",
               },
               name: "salmon",
          }),
     },
})
const NavBar = () => {
     const [textSearch, setTextSearch] = useState<string>("")
     const dispatch = useDispatch<AppDispatch>()

     const listGenres =
          useSelector((state: RootState) => state.seachMovie.genreList) || []

     // const dataSearch =
     //      useSelector((state: RootState) => state.seachMovie.movieSeach) || []
     useEffect(() => {
          dispatch(MovieGenresType())
     }, [dispatch])
     // useEffect(() => {
     //      const data = {
     //           idPage: 1,
     //           content: textSearch,
     //      }
     //      dispatch(seacheMovieSearch(data))
     // }, [dispatch, textSearch])
     const navigate = useNavigate()
     const handlerClick = () => {
          // const data = {
          //      idPage: 1,
          //      content: textSearch || "",
          // }
          // console.log(data)
          // dispatch(seacheMovieSearch(data))
          // console.log(1)
          navigate(`/movie-web/SearchPage/?title=${textSearch}`)
     }
     const storedData: userType[] = useMemo(
          () => JSON.parse(localStorage.getItem("users") || "[]"),
          []
     )
     const storeDataFilter = storedData.filter(
          (user: userType) => user.status === true
     )
     // console.log(storedData)
     const userObj: userType = useMemo(
          () => Object.assign({}, ...storeDataFilter),
          [storeDataFilter]
     )
     return (
          <>
               <ToastContainer />
               <ThemeProvider theme={theme}>
                    <List className="flex justify-around w-full ">
                         <ListItem
                              disablePadding
                              className="flex justify-center items-center "
                         >
                              <ListItemButton
                                   onClick={() =>
                                        navigate("/movie-web/homePage")
                                   }
                                   className="h-[80%]"
                              >
                                   <ListItemText
                                        primary="Home"
                                        onClick={() =>
                                             navigate("/movie-web/homePage")
                                        }
                                        className="flex justify-center items-center hover:text-red-600"
                                   />
                              </ListItemButton>
                              {/* <ListItemButton className="group h-[80%]"> */}
                              <ListItemButton className="group h-[80%] group/item relative flex justify-center items-center">
                                   <ListItemText
                                        primary="Category"
                                        className="flex justify-center items-center hover:text-red-600"
                                   />
                                   <Box className="group-hover:visible invisible  absolute z-10 top-[50px] bg-black text-white w-[50%] flex flex-col justify-center items-center">
                                        {listGenres?.map((category, index) => (
                                             <ListItemButton
                                                  key={index}
                                                  className="hover:bg-sky-700 w-[100%] flex justify-center items-center "
                                                  onClick={() =>
                                                       navigate(
                                                            `/movie-web/SearchPage/?category=${category.id}`
                                                       )
                                                  }
                                             >
                                                  {category.name}
                                             </ListItemButton>
                                        ))}
                                   </Box>
                              </ListItemButton>
                              {/* </ListItemButton> */}
                              <ListItemButton
                                   onClick={() => {
                                        if (Object.keys(userObj).length === 0) {
                                             toast.error(
                                                  "Please login to add movie to list",
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
                                        } else {
                                             navigate("/movie-web/Favorites")
                                        }
                                   }}
                                   className="h-[80%]"
                              >
                                   <ListItemText
                                        primary="List of favorite movies"
                                        // onClick={() =>
                                        //      navigate("/movie-web/Favorites")
                                        // }
                                        className="flex justify-center items-center hover:text-red-600"
                                   />
                              </ListItemButton>
                         </ListItem>
                         <ListItem className="flex justify-center items-center w-[40%] ">
                              {/* <ListItemText primary="Phim bộ" /> */}
                              <TextField
                                   InputProps={{
                                        endAdornment: (
                                             <InputAdornment position="start">
                                                  <SearchIcon
                                                       onClick={handlerClick}
                                                       className="cursor-pointer text-white"
                                                  />
                                             </InputAdornment>
                                        ),
                                        style: {
                                             color: "white",
                                        },
                                   }}
                                   onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                             handlerClick()
                                        }
                                   }}
                                   sx={{
                                        "& .MuiInputBase-input": {
                                             color: "white",
                                        },
                                        "& label.Mui-focused": {
                                             color: "white",
                                        },
                                        "& .MuiInput-underline:after": {
                                             borderBottomColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                             "& fieldset": {
                                                  borderColor: "white",
                                             },
                                             "&:hover fieldset": {
                                                  borderColor: "white",
                                             },
                                             "&.Mui-focused fieldset": {
                                                  borderColor: "white",
                                             },
                                        },

                                        "& .MuiInputLabel-root": {
                                             color: "white",
                                        },
                                   }}
                                   variant="outlined"
                                   label="Find Movies"
                                   value={textSearch}
                                   onChange={(e) => {
                                        setTextSearch(String(e.target.value))
                                   }}
                                   className="w-[60%] "
                              />
                              {/* <SearchIcon  /> */}
                         </ListItem>
                    </List>
                    <Divider></Divider>
               </ThemeProvider>
          </>
     )
}
export default NavBar
