import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../Login"
import Register from "../Register"
import HomePage from "../homePage/HomePage"
import MoviePage from "../MoviePage"
import SeachPage from "../SeachPage"
// import FavoriteMovie from "../FavoriteMovie"
import FavoriteMoviePage from "../FavoriteMovie/FavoriteMoviePage"
const router = createBrowserRouter([
     {
          path: "/movie-web/",
          element: <App />,
     },
     {
          path: "/movie-web/login",
          element: <Login />,
     },
     {
          path: "/movie-web/register",
          element: <Register />,
     },
     {
          path: "/movie-web/homePage",
          element: <HomePage />,
     },
     {
          path: "/movie-web/homePage/:id",
          element: <MoviePage />,
     },
     // // {
     // //      path: "/:slug/episodes",
     // //      element: <EpisodesMovie />,
     // // },
     // // {
     // //      path: "/:slug/episodes/:tap",
     // //      element: <EpisodesMovie />,
     // // },
     // {
     //      path: "/:slug/episodes/:tap?",
     //      element: <EpisodesMovie />,
     // },
     {
          path: "/movie-web/SearchPage/:category?/:title?&:page?",
          element: <SeachPage />,
     },
     {
          path: "/movie-web/Favorites",
          element: <FavoriteMoviePage />,
     },
])
export default router
