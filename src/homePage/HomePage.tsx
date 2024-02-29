// import { userDetail } from "../Slice/SliceAction"
import { useDispatch, useSelector } from "react-redux"
import { pageMovie, detailMovie } from "../Slice/SliceMovie"
import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "../Store/store"
import { Box, Button, Typography } from "@mui/material"
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
// import { movieDeital } from "../types/Movie"
import { useNavigate } from "react-router-dom"
import Avatar from "./Avatar"
import {
     //  dataPage,
     resultsMovie,
} from "../types/Movie"
import ListMovie from "./ListMovie"
import { MovieGenresType } from "../Slice/SliceSeachMovie"
import {
     // listFavoriteMovie,
     listFavoriteMovieDetail,
} from "../Slice/SliceMovieFavorite"
import { userType } from "../types/User"

const HomePage = () => {
     const dispatch = useDispatch<AppDispatch>()
     const data = useSelector((state: RootState) => state.pageMovie.movie) || []

     const dataDetail =
          useSelector((state: RootState) => state.pageMovie.movieDeital) ||
          data[0]
     const [itemPage, setItemPage] = useState<resultsMovie>(data[0])

     const storedData: userType[] = JSON.parse(
          localStorage.getItem("users") as string
     )

     useEffect(() => {
          dispatch(pageMovie(1))
     }, [dispatch])

     useEffect(() => {
          const storedData: userType[] = JSON.parse(
               localStorage.getItem("users") || "[]"
          )
          const storeDataFilter = storedData.filter(
               (user: userType) => user.status === true
          )
          const userObj = Object.assign({}, ...storeDataFilter)
          console.log(userObj)
          dispatch(listFavoriteMovieDetail(userObj.listMovieId))
     }, [dispatch, storedData])
     useEffect(() => {
          dispatch(MovieGenresType())
     }, [dispatch])

     useEffect(() => {
          dispatch(detailMovie(itemPage?.id || 0))
     }, [dispatch, itemPage?.id])

     const handleClickItem = (
          e: React.MouseEvent<HTMLImageElement, MouseEvent>
     ) => {
          const { id } = e.currentTarget
          const itemFilter = data.filter(
               (item: resultsMovie) => item.id === Number(id)
          )
          const x = { ...itemFilter }
          const y = x ? x[0] : {}
          setItemPage(y)
     }
     const navigator = useNavigate()
     const handleNav = () => {
          console.log(itemPage)
          console.log(data)
          navigator(
               `/movie-web/homePage/${itemPage ? itemPage.id : data[0]?.id}`
          )
     }

     return (
          <>
               <Box
                    style={{
                         backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${
                              itemPage
                                   ? itemPage?.poster_path
                                   : data[0]?.poster_path
                         })`,
                    }}
                    className="w-screen h-screen bg-no-repeat bg-cover bg-center "
               >
                    <Avatar />
                    <Box className="text-white w-[50%] h-[40%] relative top-[20px] left-[50px] flex justify-center items-center gap-5 flex-col bg-[rgba(0,0,0,.75)] ">
                         <Box className="text-4xl">{dataDetail?.title}</Box>
                         <Box className="w-[100%] h-[100%] p-[10px] leading-8 text-ellipsis overflow-hidden">
                              {dataDetail?.overview}
                         </Box>
                    </Box>
                    <Box>
                         <Button
                              onClick={handleNav}
                              className=" relative top-[50px] left-[50px] h-[50px] w-40 overflow-hidden border bg-white  shadow-xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-black hover:shadow-pink-400 hover:before:w-full hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400"
                              id={String(itemPage ? itemPage?.id : data[0]?.id)}
                         >
                              <Typography className="relative z-10">
                                   Stream now
                              </Typography>
                         </Button>
                    </Box>

                    <Box className="w-full absolute bottom-0">
                         <ListMovie
                              data={data}
                              handleClickItem={handleClickItem}
                         ></ListMovie>
                    </Box>
               </Box>
          </>
     )
}
export default HomePage
