import { Box, Typography } from "@mui/material"
import { resultsMovie } from "../types/Movie"
import { useRef, useEffect } from "react"
interface Props {
     title: string
     data: resultsMovie[]
     flex_col?: string
}
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
import { URLImg } from "../axios/customAxios"
import { useNavigate } from "react-router-dom"
const ListSeachMovie = ({ title, data, flex_col }: Props) => {
     // const URLImg = "https://image.tmdb.org/t/p/w500/"
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
     const navigate = useNavigate()
     const handleNav = (id: number) => {
          navigate(`/movie-web/homePage/${id}`)
     }
     return (
          <>
               <Box>
                    <Typography
                         onClick={() =>
                              navigate(
                                   `/movie-web/SearchPage/?category=${title}`
                              )
                         }
                         className="cursor-pointer"
                         variant="h5"
                    >
                         {title}
                    </Typography>
                    <Box
                         className={`flex gap-5 overflow-x-auto  flex-nowrap scrollbar ${flex_col}`}
                         ref={scrollRef}
                    >
                         {data.map((data, index) => {
                              return (
                                   <Box
                                        key={index}
                                        onClick={() =>
                                             handleNav(data.id as number)
                                        }
                                        className="bg-black text-white"
                                   >
                                        <img
                                             src={`${URLImg}${data.poster_path}`}
                                             alt=""
                                             className="w-[250px] h-[300px] bg-cover "
                                        />
                                        <Typography className="w-[250px] truncate">
                                             {data.title}
                                        </Typography>
                                        <Box className="flex justify-between w-[250px]">
                                             <Box className="flex">
                                                  <StarOutlinedIcon className="text-[yellow]" />
                                                  <Typography>
                                                       {data.vote_average
                                                            ? Math.round(
                                                                   data.vote_average *
                                                                        10
                                                              ) / 10
                                                            : 0}
                                                  </Typography>
                                             </Box>
                                             <Typography className="">
                                                  {
                                                       data.release_date?.split(
                                                            "-"
                                                       )[0]
                                                  }
                                             </Typography>
                                        </Box>
                                   </Box>
                              )
                         })}
                    </Box>
               </Box>
          </>
     )
}
export default ListSeachMovie
