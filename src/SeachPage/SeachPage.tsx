import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import NavBar from "../NavBar"
import { AppDispatch, RootState } from "../Store/store"

import {
     moviePopular,
     movieTopRate,
     movieUpcoming,
     movieTrending,
} from "../Slice/SliceSeachMovie"
import { Box } from "@mui/material"
import ListSeachMovie from "./ListSeachMovie"

// import MovieTrendingWeek from "./MovieTrendingWeek"
import FramePage from "./FramePage"
import CategoryMovie from "./CategoryMovie"

import { useParams, useLocation, useSearchParams } from "react-router-dom"
import Footer from "../Footer"
// import { URLImg } from "../axios/customAxios"
const SeachPage = () => {
     const [searchParams] = useSearchParams()
     const dataPopularSelector =
          useSelector((state: RootState) => state.seachMovie.moviePopular) || []
     const dataTopRateSelector =
          useSelector((state: RootState) => state.seachMovie.movieTopRate) || []
     const dataUpcomingSelector =
          useSelector((state: RootState) => state.seachMovie.movieUpcoming) ||
          []
     const dataSearch =
          useSelector((state: RootState) => state.seachMovie.movieSeach) || []
     // const dataTrendingSelector =
     //      useSelector((state: RootState) => state.seachMovie.movieTrending) ||
     //      []
     const dataSelect =
          useSelector((state: RootState) => state.seachMovie.movieGenres) || []
     const dispatch = useDispatch<AppDispatch>()
     useEffect(() => {
          dispatch(moviePopular(1))
     }, [dispatch])
     useEffect(() => {
          dispatch(movieTopRate(1))
     }, [dispatch])
     useEffect(() => {
          dispatch(movieUpcoming(1))
     }, [dispatch])
     useEffect(() => {
          dispatch(movieTrending(1))
     }, [dispatch])
     // useEffect(() => {
     //      dispatch(moviePopular())
     // }, [dispatch])
     const { category } = useParams()
     const [checkCategory, setCheckCategory] = useState(false)
     const localtion = useLocation()
     useEffect(() => {
          if (category || localtion.search.split("=")[1]) {
               setCheckCategory(true)
          } else {
               setCheckCategory(false)
          }
     }, [category, localtion])
     // const URLImg = "https://image.tmdb.org/t/p/w500/"
     // console.log(dataUpcomingSelector)

     //  console.log(localtion)

     // const title = location.search.split("/")[0]?.includes("?title")
     //      ? location.search.split("/")[0].split("=")[1]
     //      : ""
     const title = searchParams.get("title") || ""
     //console.log(location.search.split("/")[0].split("=")[1])
     return (
          <>
               <FramePage>
                    {checkCategory ? (
                         <CategoryMovie
                              dataSelectPopular={dataPopularSelector}
                              dataTopRateSelector={dataTopRateSelector}
                              dataUpcomingSelector={dataUpcomingSelector}
                              dataSelect={dataSelect}
                              dataSearch={dataSearch}
                              textSearch={title}
                         />
                    ) : (
                         <Box className=" min-w-[500px] flex flex-col gap-3 mt-5">
                              <ListSeachMovie
                                   title="Popular Movie"
                                   data={dataPopularSelector}
                              ></ListSeachMovie>

                              <ListSeachMovie
                                   title="Top Rate Movie"
                                   data={dataTopRateSelector}
                              ></ListSeachMovie>
                              <ListSeachMovie
                                   title="Upcoming Movie"
                                   data={dataUpcomingSelector}
                              ></ListSeachMovie>
                         </Box>
                    )}
               </FramePage>

               <Footer />
          </>
     )
}
export default SeachPage
