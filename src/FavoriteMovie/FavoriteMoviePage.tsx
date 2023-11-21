import {
     Button,
     Box,
     // , Typography
} from "@mui/material"
import {
     useEffect,
     useMemo,
     useState,
     // , useEffect
} from "react"

// import { ListMovieFavorites, ListMovieFavoritesV4 } from "../axios/customAxios"
import { userType } from "../types/User"
import FavoriteMovieHome from "./FavoriteMovieHome"

import NavBar from "../NavBar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Store/store"
import {
     // listFavoriteMovie,
     addListMovie,
     updateListMovie,
     listFavoriteMovieDetail,
} from "../Slice/SliceMovieFavorite"
import DialogList from "./DialogList"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const FavoriteMoviePage = () => {
     const [open, setOpen] = useState(false)
     const [listId, setListId] = useState(0)
     const [listName, setListName] = useState("")
     const [listDescription, setListDescription] = useState("")
     const [updateList, setUpdateList] = useState(false)
     // const [ListItemId, setListItemId] = useState("")
     //const [listIdFavoriteProp, setListIdFavoriteProp] = useState([])
     // const sessionId = localStorage.getItem("user")
     const dispatch = useDispatch<AppDispatch>()
     const storedData: userType[] = useMemo(
          () => JSON.parse(localStorage.getItem("users") || "[]"),
          []
     )
     const storeDataFilter = storedData.filter(
          (user: userType) => user.status === true
     )
     const dataItemList = useSelector(
          (state: RootState) => state.favoriteMovie.resultsFavoriteItems
     )
     useEffect(() => {
          let arrayId: number[] = []
          storedData
               .filter((user) => user.status == true)
               .forEach((userNow) => {
                    arrayId = userNow.listMovieId
               })
          console.log("chay ham detail")
          dispatch(listFavoriteMovieDetail(arrayId))
     }, [dispatch, storedData])

     const userObj: userType = useMemo(
          () => Object.assign({}, ...storeDataFilter),
          [storeDataFilter]
     )
     // const listMovie = userObj.listMovieId

     // useEffect(() => {
     //      dispatch(listFavoriteMovie())
     // }, [dispatch])

     const handleClickOpen = () => {
          setListName("")
          setListDescription("")
          setUpdateList(false)
          setOpen(true)
     }
     const handleClose = () => {
          setUpdateList(false)
          setOpen(false)
     }

     const handleAgreeAdd = async () => {
          const inforList = {
               description: listDescription,
               name: listName,
               accessToken: userObj.sessionId,
          }
          await dispatch(addListMovie(inforList))
          toast.success("Add list successfully", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          })
          // await dispatch(listFavoriteMovie())
          setOpen(false)
     }
     const handleAgreeUpdate = async () => {
          const data = {
               idList: listId,
               accessToken: userObj.sessionId,
               description: listDescription,
               name: listName,
          }
          console.log(data)
          await dispatch(updateListMovie(data))
          toast.success("Update list successfully", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          })
          // await dispatch(listFavoriteMovie())

          setUpdateList(false)
          setOpen(false)
     }
     return (
          <>
               <NavBar />
               <ToastContainer />
               <Box>
                    <DialogList
                         open={open}
                         handleClose={handleClose}
                         listName={listName}
                         setListName={setListName}
                         listDescription={listDescription}
                         setListDescription={setListDescription}
                         handleAgreeAdd={handleAgreeAdd}
                         updateList={updateList}
                         handleAgreeUpdate={handleAgreeUpdate}
                    />
               </Box>

               {/* {listMovie && listMovie?.length > 0 ? ( */}
               {/* <>
                         {" "} */}
               <FavoriteMovieHome
                    // listIdFavorite={listMovie as number[]}
                    accessToken={userObj.sessionId as string}
                    // name={listName}
                    // description={listDescription}
                    setOpen={setOpen}
                    setListName={setListName}
                    setListDescription={setListDescription}
                    setUpdateList={setUpdateList}
                    setListId={setListId}
                    dataItemList={dataItemList}
               />
               {/* </> */}
               {/* ) : (
                    <Typography>Ban chua co list nao</Typography>
               )} */}
               <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    className="mt-[10px]"
               >
                    Add list favorite
               </Button>
          </>
     )
}
export default FavoriteMoviePage
