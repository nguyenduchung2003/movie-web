import { Typography, Box } from "@mui/material"
import { detailMovieType } from "../types/Movie"
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"

import Rating from "@mui/material/Rating"
const InforMovie = ({
     title,
     tagline,
     genres,
     release_date,
     runtime,
     spoken_languages,
     vote_average,
     vote_count,
}: detailMovieType) => {
     return (
          <>
               <Box className="w-[500px] h-[160px] grid grid-cols-4 text-white bg-[rgba(0,0,0,.75)]">
                    <Box className="flex items-center flex-col col-span-4 ">
                         <Typography variant="h5" className="">
                              {title}
                         </Typography>
                         <Typography className=" text-sm ">
                              ({tagline})
                         </Typography>
                    </Box>

                    <Box className="flex items-center ">
                         <AccessTimeOutlinedIcon />
                         <Typography className=" text-xm leading-loose ">
                              {runtime} min.
                         </Typography>
                    </Box>

                    <Box className="flex items-center">
                         <CalendarMonthOutlinedIcon />
                         <Typography className=" text-xm leading-loose ">
                              {release_date}.
                         </Typography>
                    </Box>
                    <Box className="flex items-center">
                         <LanguageOutlinedIcon />
                         <Typography className=" text-xm leading-loose ">
                              {spoken_languages
                                   ?.map(
                                        (spoken_languages) =>
                                             spoken_languages.name
                                   )
                                   .join(", ")}
                              .
                         </Typography>
                    </Box>

                    <Box className="flex items-center col-span-4">
                         <SellOutlinedIcon />
                         <Typography className=" text-xm leading-loose ">
                              {genres?.map((genres) => genres.name).join(", ")}.
                         </Typography>
                    </Box>
                    <Box className="flex items-center gap-2 col-span-4">
                         <Rating
                              name="half-rating-read"
                              value={(vote_average as number) / 2}
                              precision={0.5}
                              readOnly
                         />
                         <Typography className="">
                              ({vote_count} votes)
                         </Typography>
                    </Box>
               </Box>
          </>
     )
}
export default InforMovie
