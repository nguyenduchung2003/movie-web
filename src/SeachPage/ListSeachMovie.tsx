import { Box, Typography } from "@mui/material"
import { resultsMovie } from "../types/Movie"
import { useRef, useEffect } from "react"
interface Props {
     title: string
     data: resultsMovie[]
}
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
import { URLImg } from "../axios/customAxios"
import { useNavigate } from "react-router-dom"
const ListSeachMovie = ({ title, data }: Props) => {
     // const URLImg = "https://image.tmdb.org/t/p/w500/"
     const scrollRef = useRef<HTMLDivElement | null>(null)
     useEffect(() => {
          const el = scrollRef.current
          if (el) {
               const scrollWidth = el.scrollWidth
               let scrollLeft = 0

               const wheelListener = (e: WheelEvent) => {
                    e.preventDefault()
                    el.scrollTo({
                         left: el.scrollLeft + e.deltaY * 2,
                         behavior: "smooth",
                    })
               }

               const scroll = () => {
                    el.scrollTo({
                         left: scrollLeft,
                         behavior: "smooth",
                    })

                    scrollLeft += 230

                    if (scrollLeft >= scrollWidth) {
                         scrollLeft = 0
                    }
               }

               el.addEventListener("wheel", wheelListener)
               const interval = setInterval(scroll, 3000)

               return () => {
                    el.removeEventListener("wheel", wheelListener)
                    clearInterval(interval)
               }
          }
     }, [])
     const navigate = useNavigate()
     const handleNav = (id: number) => {
          navigate(`/movie-web/homePage/${id}`)
     }
     return (
          <>
               <Box className="flex flex-col gap-3">
                    <Typography
                         onClick={() =>
                              navigate(
                                   `/movie-web/SearchPage/?category=${title}`
                              )
                         }
                         className="cursor-pointer text-white"
                         variant="h5"
                    >
                         {title}
                    </Typography>
                    <Box
                         className={`flex overflow-x-auto flex-nowrap scrollbar gap-5 `}
                         ref={scrollRef}
                    >
                         {data.map((data, index) => {
                              return (
                                   <Box
                                        key={index}
                                        onClick={() =>
                                             handleNav(data.id as number)
                                        }
                                        className="hover:bg-gray-500 border-2 border-rose-500  rounded-lg hover:text-white group/item transform transition duration-500 scale-95 hover:scale-100"
                                   >
                                        <img
                                             src={`${URLImg}${data.poster_path}`}
                                             alt=""
                                             className="w-[210px] h-[300px] bg-cover border rounded-t-lg "
                                        />

                                        <Box className="flex flex-col justify-items-start invisible group-hover/item:visible ">
                                             <Typography className="w-[200px] truncate flex items-start">
                                                  {data.title}
                                             </Typography>
                                             <Box className="flex justify-between w-[200px] items-start">
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
                                   </Box>
                              )
                         })}
                    </Box>
               </Box>
          </>
     )
}
export default ListSeachMovie
