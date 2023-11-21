import axios from "axios"
export const instanceUser = axios.create({
     baseURL: "//localhost:8081/",
})

export const instanceMovie = axios.create({
     baseURL: "https://ophim1.com/",
})

export const URLImg = "https://image.tmdb.org/t/p/w500"
export const api_key = "2bcac4b6800ce51437a38eef3f28ba9a"
export const account_id = "65354c61c8a5ac011cf04449"
export const instanceMovie2 = axios.create({
     baseURL: "https://api.themoviedb.org/3/movie/",
     // headers: {
     //      accept: "application/json",
     //      Authorization:
     //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     // },
})
export const instanceMovieTrending = axios.create({
     baseURL: "https://api.themoviedb.org/3/trending/movie/",
     // headers: {
     //      accept: "application/json",
     //      Authorization:
     //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     // },
})
export const instanceMovieDiscover = axios.create({
     baseURL: "https://api.themoviedb.org/3/discover/",
     // headers: {
     //      accept: "application/json",
     //      Authorization:
     //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     // },
})
export const instanceMovieSearch = axios.create({
     baseURL: "https://api.themoviedb.org/3/search/",
     // headers: {
     //      accept: "application/json",
     //      Authorization:
     //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     // },
})
export const instanceMovieGenre = axios.create({
     baseURL: "https://api.themoviedb.org/3/genre/movie/",
     // headers: {
     //      accept: "application/json",
     //      Authorization:
     //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     // },
})
////////////////////////////////
export const instanceAuthen = axios.create({
     baseURL: "https://api.themoviedb.org/3/authentication/",
     // params: {
     //      api_key: api_key,
     // },
     headers: {
          accept: "application/json",
          Authorization:
               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     },
})
export const ListMovieFavorites = axios.create({
     baseURL: "https://api.themoviedb.org/3/",
     headers: {
          accept: "application/json",
          Authorization:
               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     },
})
///////////////////////////////////////
//V4
export const RequestTokenV4 = axios.create({
     baseURL: "https://api.themoviedb.org/4/",
     headers: {
          accept: "application/json",
          Authorization:
               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     },
})
export const ListMovieFavoritesV4 = axios.create({
     baseURL: "https://api.themoviedb.org/4/",
     headers: {
          accept: "application/json",
     },
})
