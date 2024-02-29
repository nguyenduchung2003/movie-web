import {
     useEffect,
     // useRef,
     useState,
} from "react"
import {
     // useParams,
     // useLocation,
     NavLink,
     useNavigate,
     useSearchParams,
} from "react-router-dom"
import { Box, PaginationItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Store/store"
import {
     seacheMovieGenres,
     moviePopular,
     movieTopRate,
     movieUpcoming,
     MovieGenresType,
     seacheMovieSearch,
} from "../Slice/SliceSeachMovie"
import { URLImg } from "../axios/customAxios"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { resultsMovie } from "../types/Movie"
import { Typography } from "@mui/material"
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"

interface CategoryMovieProps {
     dataSelectPopular: resultsMovie[]
     dataTopRateSelector: resultsMovie[]
     dataUpcomingSelector: resultsMovie[]
     dataSelect: resultsMovie[]
     dataSearch: resultsMovie[]
     textSearch: string
}

const CategoryMovie: React.FC<CategoryMovieProps> = ({
     dataSelectPopular,
     dataTopRateSelector,
     dataUpcomingSelector,
     dataSelect,
     dataSearch,
     textSearch,
}) => {
     const [data, setData] = useState<resultsMovie[]>([])
     const [searchParams] = useSearchParams()

     // const { category } = useParams()
     const category = searchParams.get("category") as string
     const pageCurrent2 = Number(searchParams.get("page")) || 1
     const title = searchParams.get("title") as string
     // console.log(category)
     // console.log(pageCurrent2)

     // const location = useLocation()

     // const pageCurrent = location.search.split("/")[0].includes("?page")
     //      ? location.search.split("/")[0].split("=")[1]
     //      ? location.search.split("/")[1].includes("?page") ?location?.search?.split("/")[1]?.split("=")[1]:1
     // const pageCurrent =
     //      Number(location?.search?.split("/")[1]?.split("=")[1]) || 1
     // console.log(location.search.split("/")[1])
     // let pageCurrent = 1
     // if (location?.search?.split("/")[0]?.includes("?page")) {
     //      pageCurrent = Number(location.search.split("/")[0].split("=")[1])
     // } else if (location?.search?.split("/")[1]?.includes("?page")) {
     //      pageCurrent = Number(location.search.split("/")[1].split("=")[1])
     // } else {
     //      pageCurrent = 1
     // }
     const [numberPage, setNumberPage] = useState<number>(
          // Number(location.search.split("=")[1]) ||
          Number(pageCurrent2) || 1
     )
     // console.log(location.search)
     // const ref = useRef()
     // console.log(category)
     // const dataSelect =
     //      useSelector((state: RootState) => state.seachMovie.movieGenres) || []
     const dataSelectGenres =
          useSelector((state: RootState) => state.seachMovie.genreList) || []

     const totalPages =
          useSelector((state: RootState) => state.seachMovie.numberPage) || 1

     const dispatch = useDispatch<AppDispatch>()
     // const dataPopularSelector =
     //      useSelector((state: RootState) => state.seachMovie.moviePopular) || []

     useEffect(() => {
          dispatch(MovieGenresType())
     }, [dispatch])
     // useEffect(() => {
     //      const paramGenres = {
     //           idPage: numberPage,
     //           idGenres: category || "",
     //      }
     //      console.log(paramGenres)
     //      dispatch(seacheMovieGenres(paramGenres))
     // }, [category, dispatch, numberPage])
     // useEffect(() => {
     //      dispatch(moviePopular(1))
     // }, [dispatch])
     // const URLImg = "https://image.tmdb.org/t/p/w500/"
     // console.log(dataSelect)

     useEffect(() => {
          if (category == "Popular Movie") {
               dispatch(moviePopular(pageCurrent2))
          } else if (category == "Top Rate Movie") {
               dispatch(movieTopRate(pageCurrent2))
          } else if (category == "Upcoming Movie") {
               dispatch(movieUpcoming(pageCurrent2))
          } else if (textSearch != "") {
               // console.log(textSearch)
               dispatch(
                    seacheMovieSearch({
                         idPage: pageCurrent2,
                         content: textSearch,
                    })
               )
          } else if (category) {
               const paramGenres = {
                    idPage: pageCurrent2,
                    idGenres: category || "",
               }
               // console.log(paramGenres)
               dispatch(seacheMovieGenres(paramGenres))
          }
     }, [pageCurrent2, category, dispatch, textSearch])
     useEffect(() => {
          // console.log(textSearch)
          if (category == "Popular Movie") {
               setData(dataSelectPopular)
          } else if (category == "Top Rate Movie") {
               setData(dataTopRateSelector)
          } else if (category == "Upcoming Movie") {
               setData(dataUpcomingSelector)
          } else if (textSearch != "") {
               setData(dataSearch)
          } else {
               setData(dataSelect)
          }
     }, [
          category,
          dataSelectPopular,
          dataTopRateSelector,
          dataUpcomingSelector,
          dataSelect,
          textSearch,
          dataSearch,
     ])
     const pageChangeHandler = (
          event: React.ChangeEvent<unknown>,
          pageNumber: number
     ) => {
          // event.preventDefault()
          console.log(event)
          setNumberPage(pageNumber)
     }
     // console.log(totalPages)
     const navigate = useNavigate()
     const handleNav = (id: number) => {
          navigate(`/movie-web/homePage/${id}`)
     }
     return (
          <>
               <Typography variant="h5" className="text-white p-4">
                    Search:
                    {dataSelectGenres.filter((genres) => {
                         return genres.id == Number(category)
                    }).length > 0
                         ? dataSelectGenres
                                .filter((genres) => {
                                     return genres.id == Number(category)
                                })
                                .map((genre) => {
                                     return genre.name
                                })
                         : category || title}
               </Typography>

               <Box className="flex flex-wrap gap-5 justify-center items-center">
                    {data.length > 0 ? (
                         <>
                              <Box className="flex flex-wrap gap-5 justify-center items-center">
                                   {data?.map((movie, index) => {
                                        return (
                                             <Box
                                                  key={index}
                                                  onClick={() =>
                                                       handleNav(
                                                            movie.id as number
                                                       )
                                                  }
                                                  className="bg-gray-500 rounded-lg text-white "
                                             >
                                                  <img
                                                       src={`${URLImg}${movie.poster_path}`}
                                                       alt=""
                                                       className="w-[210px] h-[300px] bg-cover border rounded-t-lg "
                                                  />

                                                  <Box className="flex flex-col w-[200px] ">
                                                       <Typography className=" truncate flex ">
                                                            {movie.title}
                                                       </Typography>
                                                       <Box className="flex justify-between  ">
                                                            <Box className="flex">
                                                                 <StarOutlinedIcon className="text-[yellow]" />
                                                                 <Typography>
                                                                      {movie.vote_average
                                                                           ? Math.round(
                                                                                  movie.vote_average *
                                                                                       10
                                                                             ) /
                                                                             10
                                                                           : 0}
                                                                 </Typography>
                                                            </Box>
                                                            <Typography className="">
                                                                 {
                                                                      movie.release_date?.split(
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
                              <Stack
                                   spacing={2}
                                   className="flex justify-center items-center mt-3 mb-5"
                              >
                                   <Pagination
                                        count={
                                             totalPages > 500 ? 500 : totalPages
                                        }
                                        color="primary"
                                        onChange={(event, pageNumber) =>
                                             pageChangeHandler(
                                                  event,
                                                  pageNumber
                                             )
                                        }
                                        page={numberPage}
                                        renderItem={(item) => {
                                             // const page =
                                             //      item.page === 1
                                             //           ? // ? "&page=1"
                                             //             // : `&page=${item.page}`
                                             //             `?page=${item.page}`
                                             //           : `?page=${item.page}`
                                             const pageQueryParam =
                                                  item.page === 1
                                                       ? "&page=1"
                                                       : `&page=${item.page}`

                                             const categorySearch = textSearch
                                                  ? `?title=${textSearch}`
                                                  : `?category=${category}`
                                             // if (data?.length > 0) {
                                             return (
                                                  <PaginationItem
                                                       className="text-white"
                                                       component={NavLink}
                                                       // to={`/SeachPage/${category}/${
                                                       //      item.page === 1
                                                       //           ? "?page=1"
                                                       //           : `?page=${item.page}`
                                                       // }`}
                                                       // to={`/SearchPage/${categorySearch}${page}`}
                                                       to={`/movie-web/SearchPage/${categorySearch}${pageQueryParam}`}
                                                       {...item}
                                                  />
                                             )
                                             // }
                                        }}
                                   ></Pagination>
                              </Stack>
                         </>
                    ) : (
                         <Typography className="text-white w-[1150px] flex justify-center items-center">
                              No valid movies found
                         </Typography>
                    )}
               </Box>
          </>
     )
}
export default CategoryMovie
