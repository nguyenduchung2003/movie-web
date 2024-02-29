import { Box, Typography } from "@mui/material"
import { resultsMovie } from "../types/Movie"

import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
const MovieTrendingWeek = ({
     dataTrendingSelector,
     URLImg,
}: {
     dataTrendingSelector: resultsMovie[]
     URLImg: string
}) => {
     return (
          <Box className="flex flex-col overflow-y-auto overflow-x-hidden h-[1080px] scrollbar mt-5">
               <Typography className="cursor-pointer text-white" variant="h5">
                    Hot trending weekend
               </Typography>
               <Box className="flex flex-col gap-5">
                    {dataTrendingSelector.map((data, index) => {
                         return (
                              <Box key={index} className="bg-black text-white">
                                   <img
                                        src={`${URLImg}${data.poster_path}`}
                                        alt=""
                                        className="w-[250px] h-[300px] bg-cover "
                                   />
                                   <Typography className="w-[250px] truncate">
                                        {data.title}
                                   </Typography>
                                   <Box className="flex justify-between">
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
                                             {data.release_date?.split("-")[0]}
                                        </Typography>
                                   </Box>
                              </Box>
                         )
                    })}
               </Box>
          </Box>
     )
}
export default MovieTrendingWeek
