import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../Store/store"
import { useEffect } from "react"
import { similarMovie } from "../Slice/SliceMovie"
// import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ListMovie from "../homePage/ListMovie"
const MovieSimilar = ({ id }: { id: number }) => {
     const dataSelector =
          useSelector((state: RootState) => state.pageMovie.movieSimilar) || []
     const dispatch = useDispatch<AppDispatch>()
     useEffect(() => {
          dispatch(similarMovie(id))
     }, [dispatch, id])
     const navigate = useNavigate()
     const handlMovieSimilar = (
          e: React.MouseEvent<HTMLImageElement, MouseEvent>
     ) => {
          const { id } = e.currentTarget

          navigate(`/homePage/${id}`)
     }

     // const urlImg = "https://image.tmdb.org/t/p/w500"
     return (
          <>
               <ListMovie
                    data={dataSelector}
                    handleClickItem={handlMovieSimilar}
               ></ListMovie>
               {/* {dataSelector.map((data, index) => {
                    return (
                         <Box key={index}>
                              <img
                                   src={`${urlImg}${data.poster_path}`}
                                   alt=""
                                   id={String(data.id)}
                                   onClick={handlMovieSimilar}
                              />
                         </Box>
                    )
               })} */}
          </>
     )
}
export default MovieSimilar
