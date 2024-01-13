// import { userDetail } from "../Slice/SliceAction"
import { useDispatch, useSelector } from "react-redux"
import { pageMovie, detailMovie } from "../Slice/SliceMovie"
import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "../Store/store"
import { Box, Button } from "@mui/material"
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
     const [itemPage, setItemPage] = useState<resultsMovie>({
          adult: false,
          backdrop_path: "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
          genre_ids: [27, 53],
          id: 951491,
          original_language: "en",
          original_title: "Saw X",
          overview:
               "Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer, only to discover the entire operation is a scam to defraud the most vulnerable. Armed with a newfound purpose, the infamous serial killer returns to his work, turning the tables on the con artists in his signature visceral way through devious, deranged, and ingenious traps.",
          popularity: 2062.741,
          poster_path: "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
          release_date: "2023-09-26",
          title: "Saw X",
          video: false,
          vote_average: 7.3,
          vote_count: 379,
     })
     // const [itemMovieNext, setItemMovieNext] = useState<number>(6)
     // const [itemMovieBack, setItemMovieBack] = useState<number>(0)
     const data = useSelector((state: RootState) => state.pageMovie.movie) || []
     // console.log(data)
     const dataDetail =
          useSelector((state: RootState) => state.pageMovie.movieDeital) || {}
     // console.log(dataDetail)
     // useEffect(() => {
     //      dispatch(userDetail())
     // }, [dispatch])

     // useEffect(() => {
     //      dispatch(pageMovie(1))
     // }, [dispatch])
     const storedData: userType[] = JSON.parse(
          localStorage.getItem("users") as string
     )

     useEffect(() => {
          dispatch(pageMovie(1))
     }, [dispatch])
     // useEffect(() => {
     //      dispatch(listFavoriteMovie())
     // }, [dispatch])

     useEffect(() => {
          // let arrayId: number[] = []
          // storedData
          //      .filter((user) => user.status == true)
          //      .forEach((userNow) => {
          //           arrayId = userNow.listMovieId
          //      })
          // console.log(arrayId)
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
          dispatch(detailMovie(itemPage.id || 0))
     }, [dispatch, itemPage.id])
     // interface movie {
     //      modified?: object
     //      name?: string
     //      origin_name?: string
     //      poster_url?: string
     //      slug?: string
     //      thumb_url?: string
     //      year?: number
     //      _id?: string
     // }
     // const onClickBackItem = () => {
     //      const totalItems = data?.length || 0
     //      const itemsPerPage = 6

     //      if (itemMovieNext <= itemsPerPage) {
     //           setItemMovieNext(totalItems)
     //           setItemMovieBack(totalItems - 6)
     //      } else {
     //           setItemMovieNext(itemMovieNext - 6)
     //           setItemMovieBack(itemMovieBack - 6)
     //      }
     // }
     // const onClickNextItem = () => {
     //      const totalItems = data?.length || 0
     //      const itemsPerPage = 6
     //      if (itemMovieNext <= totalItems) {
     //           setItemMovieNext(itemMovieNext + 6)
     //           setItemMovieBack(itemMovieBack + 6)
     //      } else {
     //           setItemMovieNext(totalItems)
     //           setItemMovieBack(0)
     //      }
     // }
     // const itemsPerPage = 6

     // const onClickBackItem = () => {
     //      let newBack = itemMovieBack - itemsPerPage
     //      let newNext = itemMovieNext - itemsPerPage

     //      if (newBack < 0) {
     //           newBack = data?.length - itemsPerPage
     //           newNext = data?.length
     //      }

     //      setItemMovieNext(newNext)
     //      setItemMovieBack(newBack)
     // }

     // const onClickNextItem = () => {
     //      let newBack = itemMovieBack + itemsPerPage
     //      let newNext = itemMovieNext + itemsPerPage

     //      if (newNext > data?.length) {
     //           newBack = 0
     //           newNext = itemsPerPage
     //      }

     //      setItemMovieNext(newNext)
     //      setItemMovieBack(newBack)
     // }

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
          navigator(`/movie-web/homePage/${itemPage.id}`)
     }

     return (
          <>
               <Box
                    style={{
                         backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${itemPage?.poster_path})`,
                    }}
                    className="w-screen h-screen bg-no-repeat bg-cover bg-center"
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
                              className="relative top-[50px] left-[50px] border-2 border-solid bg-white text-black w-[15%]"
                              id={String(itemPage.id)}
                         >
                              Xem phim
                         </Button>
                    </Box>
                    {/* <Box className="w-screen flex absolute bottom-0 justify-center items-center ">
                         <ArrowBackIosNewIcon onClick={onClickBackItem} />

                         {data
                              ?.slice(itemMovieBack, itemMovieNext)
                              .map((item: resultsMovie, index) => (
                                   <Box
                                        key={index}
                                        className="w-[240px] flex flex-col justify-center group/item "
                                   >
                                        <img
                                             src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                             loading="lazy"
                                             className="  h-[300px] scale-[0.90] rounded"
                                             id={String(item.id)}
                                             onClick={handleClickItem}
                                        />
                                        <Box className="group/edit invisible  top-[-10px] z-10 text-white bg-[rgba(0,0,0,.75)] scale-[0.90]  group-hover/item:w-[100%] group-hover/item:h-[50px] flex justify-center items-center   group-hover/item:visible group-hover/item:relative">
                                             <Box>{item.title}</Box>
                                        </Box>
                                   </Box>
                              ))}

                         <ArrowForwardIosIcon onClick={onClickNextItem} />
                    </Box> */}
                    <Box className="absolute bottom-0 w-screen">
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
