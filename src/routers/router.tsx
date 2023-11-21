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
          path: "/",
          element: <App />,
     },
     {
          path: "/login",
          element: <Login />,
     },
     {
          path: "/register",
          element: <Register />,
     },
     {
          path: "/homePage",
          element: <HomePage />,
     },
     {
          path: "/homePage/:id",
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
          path: "/SearchPage/:category?/:title?&:page?",
          element: <SeachPage />,
     },
     {
          path: "/Favorites",
          element: <FavoriteMoviePage />,
     },
])
export default router
