// import { userDetail } from "../Slice/SliceAction"
// import { useDispatch, useSelector } from "react-redux"
// import { pageMovie, detailMovie } from "../Slice/SliceMovie"
import { useState } from "react"
// import { AppDispatch, RootState } from "../Store/store"
import {
     Box,
     Button,
     // , Button
} from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
// import { movieDeital } from "../types/Movie"
// import { useNavigate } from "react-router-dom"
// import Avatar from "./Avatar"
import {
     //  dataPage,
     resultsMovie,
} from "../types/Movie"
interface Props {
     data: resultsMovie[]
     handleClickItem?: (
          e: React.MouseEvent<HTMLImageElement, MouseEvent>
     ) => void
}
const ListMovie = ({ data, handleClickItem }: Props) => {
     const [itemMovieNext, setItemMovieNext] = useState<number>(6)
     const [itemMovieBack, setItemMovieBack] = useState<number>(0)
     const itemsPerPage = 6

     const onClickBackItem = () => {
          let newBack = itemMovieBack - itemsPerPage
          let newNext = itemMovieNext - itemsPerPage

          if (newBack < 0) {
               newBack = data?.length - itemsPerPage
               newNext = data?.length
          }

          setItemMovieNext(newNext)
          setItemMovieBack(newBack)
     }

     const onClickNextItem = () => {
          let newBack = itemMovieBack + itemsPerPage
          let newNext = itemMovieNext + itemsPerPage

          if (newNext > data?.length) {
               newBack = 0
               newNext = itemsPerPage
          }

          setItemMovieNext(newNext)
          setItemMovieBack(newBack)
     }

     return (
          <>
               <Box className="w-full flex justify-center items-center ">
                    <Button
                         className="hover:bg-[rgba(0,0,0,.75)] cursor-pointer "
                         onClick={onClickBackItem}
                    >
                         <ArrowBackIosNewIcon />
                    </Button>

                    {data
                         ?.slice(itemMovieBack, itemMovieNext)
                         .map((item: resultsMovie, index: number) => (
                              <Box
                                   key={index}
                                   className="w-[15%] flex flex-col justify-center group/item "
                              >
                                   <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        loading="lazy"
                                        className="  xl:h-[300px] lg:h-[250px] scale-[0.90] rounded"
                                        id={String(item.id)}
                                        onClick={handleClickItem}
                                   />
                                   <Box className="group/edit invisible  top-[-10px] z-10 text-white bg-[rgba(0,0,0,.75)] scale-[0.90]  group-hover/item:w-[100%] group-hover/item:h-[50px] flex justify-center items-center   group-hover/item:visible group-hover/item:relative">
                                        <Box className="truncate">
                                             {item.title}
                                        </Box>
                                   </Box>
                              </Box>
                         ))}
                    <Button
                         className="hover:bg-[rgba(0,0,0,.75)] cursor-pointer "
                         onClick={onClickNextItem}
                    >
                         <ArrowForwardIosIcon />
                    </Button>
               </Box>
          </>
     )
}
export default ListMovie
