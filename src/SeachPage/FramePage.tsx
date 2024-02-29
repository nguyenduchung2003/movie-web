import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar"
import { AppDispatch, RootState } from "../Store/store"
import { useEffect } from "react"
import {
     // moviePopular,
     // movieTopRate,
     // movieUpcoming,
     movieTrending,
} from "../Slice/SliceSeachMovie"
import { Box } from "@mui/material"
// import ListSeachMovie from "./ListSeachMovie"

import MovieTrendingWeek from "./MovieTrendingWeek"
import { PropsWithChildren } from "react"
import { URLImg } from "../axios/customAxios"
const FramePage: React.FC<PropsWithChildren> = ({ children }) => {
     // const dataPopularSelector =
     //      useSelector((state: RootState) => state.seachMovie.moviePopular) || []
     // const dataTopRateSelector =
     //      useSelector((state: RootState) => state.seachMovie.movieTopRate) || []
     // const dataUpcomingSelector =
     //      useSelector((state: RootState) => state.seachMovie.movieUpcoming) ||
     //      []
     const dataTrendingSelector =
          useSelector((state: RootState) => state.seachMovie.movieTrending) ||
          []
     const dispatch = useDispatch<AppDispatch>()
     // useEffect(() => {
     //      dispatch(moviePopular(1))
     // }, [dispatch])
     // useEffect(() => {
     //      dispatch(movieTopRate(1))
     // }, [dispatch])
     // useEffect(() => {
     //      dispatch(movieUpcoming(1))
     // }, [dispatch])
     useEffect(() => {
          dispatch(movieTrending(1))
     }, [dispatch])
     // useEffect(() => {
     //      dispatch(moviePopular())
     // }, [dispatch])
     // const URLImg = "https://image.tmdb.org/t/p/w500/"

     return (
          <>
               <Box className="min-w-[500px] ">
                    <Box className="bg-[rgba(0,0,0,.75)] text-white">
                         <NavBar />
                    </Box>
                    <Box className="bg-black ">
                         <Box className="flex gap-[50px] w-full ">
                              <Box className="max-w-[75%] ml-[50px]">
                                   {children}
                              </Box>

                              <MovieTrendingWeek
                                   dataTrendingSelector={dataTrendingSelector}
                                   URLImg={URLImg}
                              />
                         </Box>
                    </Box>
               </Box>
          </>
     )
}
export default FramePage
