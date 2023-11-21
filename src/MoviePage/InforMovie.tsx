import { Typography, Box } from "@mui/material"
import { detailMovieType } from "../types/Movie"
const InforMovie = ({
     // adult,
     // backdrop_path,
     belongs_to_collection,
     // budget,
     genres,
     // homepage,
     // id,
     // imdb_id,
     // original_language,
     // original_title,
     // overview,
     // popularity,
     // poster_path,
     production_companies,
     production_countries,
     release_date,
     // revenue,
     runtime,
     spoken_languages,
     // status,
     // tagline,
     // title,
     // video,
     vote_average,
     vote_count,
}: detailMovieType) => {
     return (
          <>
               <Box className="flex flex-col gap-3 relative left-[10px] ">
                    <Typography className="text-black text-xm leading-loose ">
                         Belongs To Collection :{belongs_to_collection?.name}.
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         Genres:{" "}
                         {genres?.map((genres) => genres.name).join(", ")}.
                    </Typography>
                    <Typography className="text-black text-xm leading-loose w-[70%]">
                         Production companies:
                         {production_companies
                              ?.map(
                                   (production_companies) =>
                                        production_companies.name
                              )
                              .join(", ")}
                         .
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         runtime:{runtime}.
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         language:{" "}
                         {spoken_languages
                              ?.map((spoken_languages) => spoken_languages.name)
                              .join(", ")}
                         .
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         release_date {release_date}.
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         country:{" "}
                         {production_countries
                              ?.map(
                                   (production_countries) =>
                                        production_countries.name
                              )
                              .join(", ")}
                         .
                    </Typography>
                    <Typography className="text-black text-xm leading-loose ">
                         vote_average: {vote_average}.
                    </Typography>

                    <Typography className="text-black text-xm leading-loose ">
                         vote_count:{vote_count}.
                    </Typography>
               </Box>
          </>
     )
}
export default InforMovie
