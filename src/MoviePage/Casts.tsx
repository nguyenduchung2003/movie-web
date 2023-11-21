import { castsMovie } from "../Slice/SliceMovie"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../Store/store"
import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
interface Props {
     id: number
}
const Casts = ({ id }: Props) => {
     const dispatch = useDispatch<AppDispatch>()
     useEffect(() => {
          dispatch(castsMovie(Number(id)))
     }, [dispatch, id])
     const data = useSelector((state: RootState) => state.pageMovie.casts || {})
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
     return (
          <>
               <Box
                    className="flex   overflow-x-auto max-w-[100%] flex-nowrap scrollbar gap-5"
                    ref={scrollRef}
               >
                    {data?.cast?.map((castMovie, index) => {
                         if (castMovie.profile_path) {
                              return (
                                   <Box
                                        key={index}
                                        className="flex flex-col justify-center items-center "
                                   >
                                        <img
                                             src={`https://image.tmdb.org/t/p/w500/${castMovie?.profile_path}`}
                                             alt=""
                                             className="w-[60px] h-[60px] rounded-full"
                                        />
                                        <Box className="truncate w-[70px]">
                                             {castMovie.name}
                                        </Box>
                                   </Box>
                              )
                         }
                    })}
               </Box>
          </>
     )
}
export default Casts
