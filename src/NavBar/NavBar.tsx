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
import { useEffect, useState } from "react"
// import { instanceMovie } from "../axios/customAxios"
import { useSelector, useDispatch } from "react-redux"
import {
     MovieGenresType,
     // , seacheMovieSearch
} from "../Slice/SliceSeachMovie"
import { useNavigate } from "react-router-dom"

import { AppDispatch, RootState } from "../Store/store"

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
          navigate(`/SearchPage/?title=${textSearch}`)
     }

     return (
          <>
               <List className="flex justify-around w-full ">
                    <ListItem
                         disablePadding
                         className="flex justify-center items-center "
                    >
                         <ListItemButton
                              onClick={() => navigate("/homePage")}
                              className="h-[80%]"
                         >
                              <ListItemText
                                   primary="Home"
                                   onClick={() => navigate("/homePage")}
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
                                                       `/SearchPage/?category=${category.id}`
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
                              onClick={() => navigate("/Favorites")}
                              className="h-[80%]"
                         >
                              <ListItemText
                                   primary="List of favorite movies"
                                   onClick={() => navigate("/Favorites")}
                                   className="flex justify-center items-center hover:text-red-600"
                              />
                         </ListItemButton>
                    </ListItem>
                    <ListItem className="flex justify-center items-center w-[40%]">
                         {/* <ListItemText primary="Phim bộ" /> */}
                         <TextField
                              InputProps={{
                                   endAdornment: (
                                        <InputAdornment position="start">
                                             <SearchIcon
                                                  onClick={handlerClick}
                                                  className="cursor-pointer"
                                             />
                                        </InputAdornment>
                                   ),
                              }}
                              variant="outlined"
                              label="Search"
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
          </>
     )
}
export default NavBar
