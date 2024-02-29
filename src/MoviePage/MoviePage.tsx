// import { useSelector } from "react-redux"
import {
     // useNavigate,
     useParams,
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { detailMovie, trailerMovie } from "../Slice/SliceMovie"
import { useEffect, useRef, useState, useMemo } from "react"
import { AppDispatch, RootState } from "../Store/store"
import { Box, Button, Typography, Divider } from "@mui/material"
import InforMovie from "./InforMovie"
import NavBar from "../NavBar"

import YouTube, { YouTubeProps } from "react-youtube"
import Casts from "./Casts"
// import "./MoviePage.css"
import MovieSimilar from "./MovieSimilar"

import ToastListFavorite from "./ToastListFavorite"
import {
     FavoriteMovie,
     // , listFavoriteMovie
} from "../Slice/SliceMovieFavorite"
import { userType } from "../types/User"
// import { ListMovieFavoritesV4 } from "../axios/customAxios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PayloadAction } from "@reduxjs/toolkit"
import { detailMovieType } from "../types/Movie"

const MoviePage = () => {
     const { id } = useParams()
     // const [id, setSent] = useState<string>(id || "")
     const dispatch = useDispatch<AppDispatch>()

     // const data =
     //      useSelector((state: RootState) => state.pageMovie.episodes) || []

     const dataDetail = useSelector(
          (state: RootState) => state.pageMovie.movieDeital || {}
     )
     const dataDetailTrailer = useSelector(
          (state: RootState) => state.pageMovie.trailerMovie || {}
     )
     console.log("dataDetailTrailer", dataDetailTrailer)

     // const accessTokenSelector = useSelector(
     //      (state: RootState) => state.accountSlice.access_token
     // )
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
     // console.log(dataDetailTrailer)
     // console.log(data)
     // console.log(dataDetail)
     useEffect(() => {
          dispatch(detailMovie(Number(id) || 1))
     }, [dispatch, id])
     useEffect(() => {
          dispatch(trailerMovie(Number(id) || 1))
     }, [dispatch, id])
     const onPlayerReady: YouTubeProps["onReady"] = (event) => {
          // access to player in all event handlers via event.target

          event.target.pauseVideo()
     }

     const opts: YouTubeProps["opts"] = {
          height: "300",
          width: "450",
          playerVars: {
               autoplay: 0,
          },
     }
     const scrollRef = useRef<HTMLDivElement | null>(null)

     useEffect(() => {
          const el = scrollRef.current
          if (el) {
               const wheelListener = (e: WheelEvent) => {
                    e.preventDefault()
                    el.scrollTo({
                         left: el.scrollLeft + e.deltaY * 2,
                         behavior: "smooth",
                    })
               }
               el.addEventListener("wheel", wheelListener)
               return () => el.removeEventListener("wheel", wheelListener)
          }
     }, [])
     const [open, setOpen] = useState<boolean>(false)
     const handlerLikeMovie = (id: number) => {
          console.log(id)
          if (Object.keys(userObj).length === 0) {
               toast.error("Please login to add movie to list", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               })
          } else {
               setOpen(true)
          }
     }

     const [valueIdList, setValueIdList] = useState("")
     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValueIdList((event.target as HTMLInputElement).value)
     }

     const handleCancel = () => {
          setOpen(false)
     }
     // const dataItemList = useSelector(
     //      (state: RootState) => state.favoriteMovie.resultsFavoriteItems
     // )
     // console.log(dataItemList)
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
     const handleOk = async () => {
          const config = {
               idList: Number(valueIdList),
               idMovie: dataDetail.id as number,
               accessToken: userObj.sessionId as string,
               dataDetail: dataDetail,
          }

          const x = (await dispatch(FavoriteMovie(config))) as PayloadAction<{
               data: addItemType
               dataDetail: detailMovieType
               id: number
          }>

          if (
               (x.payload?.data as addItemType)?.results.some(
                    (data: {
                         error?: []
                         media_id: number
                         media_type: string
                         success: boolean
                    }) => data.success == false
               )
          ) {
               toast.error("Movie already exists in the list", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               })
          } else {
               toast.success("Added movie successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               })
          }
          setOpen(false)
     }
     // const x = useSelector(
     //      (state: RootState) => state.favoriteMovie.resultsFavoriteItems
     // )
     // console.log(x)
     return (
          <>
               <Box className="">
                    <ToastContainer />
                    <Box className="bg-[rgba(0,0,0,.75)] text-white">
                         <NavBar />
                    </Box>

                    <ToastListFavorite
                         open={open}
                         handleCancel={handleCancel}
                         handleOk={handleOk}
                         handleChange={handleChange}
                         valueIdList={valueIdList}
                         // dataItemList={dataItemList}
                    ></ToastListFavorite>
                    <Box className="flex flex-col bg-black text-white">
                         <Box className="flex justify-center items-center flex-col">
                              <Box
                                   className="w-[100%] h-[350px] bg-no-repeat bg-cover  bg-center"
                                   style={{
                                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${dataDetail?.poster_path})`,
                                   }}
                              >
                                   <Box className="flex justify-center relative top-[190px]">
                                        <InforMovie
                                             title={dataDetail.title}
                                             tagline={dataDetail.tagline}
                                             genres={dataDetail.genres}
                                             release_date={
                                                  dataDetail.release_date
                                             }
                                             runtime={dataDetail.runtime}
                                             spoken_languages={
                                                  dataDetail.spoken_languages
                                             }
                                             vote_average={
                                                  dataDetail.vote_average
                                             }
                                             vote_count={dataDetail.vote_count}
                                        />
                                   </Box>
                                   {/* </Box> */}

                                   <img
                                        src={`https://image.tmdb.org/t/p/w500/${dataDetail?.poster_path}`}
                                        alt=""
                                        className="h-[350px] w-[100%] object-contain relative top-[0px] left-[-25%]"
                                   />
                              </Box>

                              <Box className="w-[60%] flex justify-end ml-[500px] flex-col gap-2 mt-4">
                                   <Typography variant="h4">
                                        Movie Summary
                                   </Typography>
                                   <Typography className="leading-7">
                                        {dataDetail.overview}
                                   </Typography>
                                   <Button
                                        type="submit"
                                        variant="contained"
                                        className="rounded h-[40px] w-[130px]"
                                        color="primary"
                                        onClick={() =>
                                             handlerLikeMovie(
                                                  dataDetail.id as number
                                             )
                                        }
                                   >
                                        Add list
                                   </Button>
                              </Box>

                              <Box className="flex w-[100%] gap-5 mt-5 ">
                                   <Box className="w-[30%] flex flex-col justify-center items-center relative top-10">
                                        <Typography
                                             variant="h4"
                                             className="py-2"
                                        >
                                             Caster
                                        </Typography>
                                        <Casts
                                             id={Number(dataDetail.id)}
                                        ></Casts>
                                   </Box>

                                   <Box className="flex flex-col justify-center max-w-[70%] items-center">
                                        <Typography
                                             variant="h4"
                                             className="py-2 "
                                        >
                                             Trailer and Clips
                                        </Typography>
                                        <Box
                                             className="flex gap-5  overflow-x-auto max-w-[100%] flex-nowrap scrollbarMovieTrailer"
                                             ref={scrollRef}
                                        >
                                             {dataDetailTrailer.results?.map(
                                                  (trailerMovie, index) => {
                                                       return (
                                                            <>
                                                                 <YouTube
                                                                      key={
                                                                           index
                                                                      }
                                                                      videoId={
                                                                           trailerMovie.key
                                                                      }
                                                                      opts={
                                                                           opts
                                                                      }
                                                                      onReady={
                                                                           onPlayerReady
                                                                      }
                                                                 ></YouTube>
                                                            </>
                                                       )
                                                  }
                                             )}
                                        </Box>
                                   </Box>
                              </Box>
                         </Box>
                         <Box className="w-full mt-10">
                              <Divider
                                   className="text-white "
                                   sx={{
                                        "&::before, &::after": {
                                             borderColor: "white",
                                        },
                                   }}
                              >
                                   <Typography variant="h5">
                                        Movie Similar
                                   </Typography>
                              </Divider>

                              <MovieSimilar
                                   id={Number(dataDetail.id)}
                              ></MovieSimilar>
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default MoviePage
