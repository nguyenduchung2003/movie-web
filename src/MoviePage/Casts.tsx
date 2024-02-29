import { castsMovie } from "../Slice/SliceMovie"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../Store/store"
import { useEffect } from "react"
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
     // const scrollRef = useRef<HTMLDivElement | null>(null)

     // useEffect(() => {
     //      const el = scrollRef.current
     //      if (el) {
     //           const wheelListener = (e: WheelEvent) => {
     //                e.preventDefault()
     //                el.scrollTo({
     //                     left: el.scrollLeft + e.deltaY * 2,
     //                     behavior: "smooth",
     //                })
     //           }
     //           el.addEventListener("wheel", wheelListener)
     //           return () => el.removeEventListener("wheel", wheelListener)
     //      }
     // }, [])
     return (
          <>
               <Box className="flex flex-col overflow-y-auto overflow-x-hidden h-[380px] gap-4 scrollbar mt-5">
                    {data?.cast?.map((castMovie, index) => {
                         if (castMovie.profile_path) {
                              return (
                                   <Box
                                        key={index}
                                        className="flex justify-center items-center gap-4"
                                   >
                                        <img
                                             src={`https://image.tmdb.org/t/p/w500/${castMovie?.profile_path}`}
                                             alt=""
                                             className="w-[80px] h-[80px] rounded-full"
                                        />
                                        <Box className="truncate w-[120px]">
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
