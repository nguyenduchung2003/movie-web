// import { ListMovieFavorites, ListMovieFavoritesV4 } from "../axios/customAxios"
import {
     // useEffect,
     useState,
} from "react"
// import { Box } from "@mui/material"
import {
     Box,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableRow,
     IconButton,
     Collapse,
     Typography,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
// import { userType } from "../types/User"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Store/store"
import {
     // listFavoriteMovie,
     deleteListMovie,
     // updateListMovie,
     updateCommentMovie,
     deleteItem,
     clearItemList,
     // listFavoriteMovieDetail,
} from "../Slice/SliceMovieFavorite"
import {
     // resultsFavoriteMovie,
     // favoriteMovieType,
     listMovieTypes,
     commentType,
     resultsMovie,
} from "../types/Movie"
// import { RequestTokenV4 } from "../axios/customAxios"
// import { AxiosResponse } from "axios"
import React from "react"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"
import DialogComment from "./DialogComment"

import DialogDelete from "./DialogDelete"
import { toast } from "react-toastify"
import { URLImg } from "../axios/customAxios"
interface Props {
     // listIdFavorite: number[]
     accessToken: string
     // description: string
     // name: string
     setOpen: React.Dispatch<React.SetStateAction<boolean>>
     setListName: React.Dispatch<React.SetStateAction<string>>
     setListDescription: React.Dispatch<React.SetStateAction<string>>
     setUpdateList: React.Dispatch<React.SetStateAction<boolean>>
     setListId: React.Dispatch<React.SetStateAction<number>>
     dataItemList: listMovieTypes[]
}

const FavoriteMovieHomePage: React.FC<Props> = ({
     // listIdFavorite,
     accessToken,
     // description,
     // name,
     setOpen,
     setListName,
     setListDescription,
     setUpdateList,
     setListId,
     dataItemList,
}) => {
     //  const [data, setData] = useState<listMovieType[]>([])
     // const [dataMovieListFavorite, setDataMovieListFavorite] = useState<
     //      listMovieTypes[]
     // >([])
     const dispatch = useDispatch<AppDispatch>()
     // const dataSelector = useSelector(
     //      (state: RootState) => state.favoriteMovie.resultsFavoriteFilter
     // )

     const dataSelectGenres =
          useSelector((state: RootState) => state.seachMovie.genreList) || []

     // useEffect(() => {
     //      dispatch(listFavoriteMovieDetail())
     // }, [dispatch])

     // const dataItemList = useSelector(
     //      (state: RootState) => state.favoriteMovie.resultsFavoriteItems
     // )
     // console.log(dataItemList)
     // const account_id = "65354c61c8a5ac011cf04449"
     // useEffect(() => {
     //      // const storedData: userType[] = JSON.parse(
     //      //      localStorage.getItem("users") || "[]"
     //      // )
     //      // const storeDataFilter = storedData.filter(
     //      //      (user: userType) => user.status === true
     //      // )
     //      // // console.log(storedData)
     //      // const userObj = Object.assign({}, ...storeDataFilter)

     //      // const listMovie = userObj.listMovieId

     //      // ;(async () => {
     //      //      const response = await ListMovieFavorites.get(
     //      //           `account/${account_id}/lists`
     //      //      )
     //      //      console.log(response.data)
     //      //      const dataList = response.data.results
     //      //      const dataFilter = dataList.filter((data: listMovieType) => {
     //      //           const values = listIdFavorite.values()
     //      //           for (const value of values) {
     //      //                return data.id == value
     //      //           }
     //      //      })
     //      //      setData(dataFilter)
     //      // })()
     //      async function fetchData() {
     //           const response = await ListMovieFavoritesV4.get(
     //                `account/${account_id}/lists`,
     //                {
     //                     headers: {
     //                          accept: "application/json",
     //                          Authorization:
     //                               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNhYzRiNjgwMGNlNTE0MzdhMzhlZWYzZjI4YmE5YSIsInN1YiI6IjY1MzU0YzYxYzhhNWFjMDExY2YwNDQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkoB85uLD3ShL3earP1oqISiTMEdH4QwHQtbs-79ZNk",
     //                     },
     //                }
     //           )
     //           console.log(response.data)
     //           const dataList = response.data.results
     //           console.log(listIdFavorite)
     //           const dataFilterArray: listMovieType[] = []

     //           const dataFilter = dataList.filter((data: listMovieType) => {
     //                const values = listIdFavorite.values()
     //                for (const value of values) {
     //                     return data.id == value
     //                }
     //           })

     //           dataList.forEach((data: listMovieType) => {
     //                listIdFavorite.forEach((listId: number) => {
     //                     if (data.id === listId) {
     //                          dataFilterArray.push(data)
     //                     }
     //                })
     //           })
     //           console.log(dataFilterArray)

     //           console.log(dataFilter)
     //           // setData(dataFilter)
     //           setData(dataFilterArray)
     //      }
     //      fetchData()
     // }, [listIdFavorite])
     // useEffect(() => {
     //      dispatch(listFavoriteMovie())
     // }, [dispatch])
     //const [open, setOpen] = useState<boolean>(false)
     const [openTable, setOpenTable] = useState<Array<boolean>>(
          new Array(dataItemList?.length).fill(false)
     )

     const [openDelete, setOpenDelete] = useState<boolean>(false)
     const [idListDelete, setIdListDelete] = useState<number>(0)
     const [openDeleteListItem, setOpenDeleteListItem] =
          useState<boolean>(false)
     // const [idListItemDelete, setIdListItemDelete] = useState<number>(0)
     const handlerDeleteList = async (id: number) => {
          setIdListDelete(id)
          setOpenDelete(true)
          setOpenDeleteListItem(false)
     }
     const handleAgreeDeleteList = async () => {
          const data = {
               idList: idListDelete,
               accessToken: accessToken,
          }
          setOpenDelete(false)

          await dispatch(deleteListMovie(data))
          toast.success("Delete list successfully", {
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
     }

     const handlerUpdateList = async (
          id: number,
          nameCurrent: string,
          descriptionCurrent: string
     ) => {
          // const data = {
          //      idList: id,
          //      accessToken: accessToken,
          //      description: description,
          //      name: name,
          // }
          setUpdateList(true)
          setOpen(true)
          setListName(nameCurrent)
          setListDescription(descriptionCurrent)
          setListId(id)
          // await dispatch(updateListMovie(data))
          // await dispatch(listFavoriteMovie())
     }
     const [updateComment, setUpdateComment] = useState<boolean>(false)
     const [comment, setComment] = useState<string>("")
     const [idList, setIdList] = useState<number>(0)
     const [idMovie, setIdMovie] = useState<number>(0)
     const handlerUpdateComment = (
          cmt: string,
          idM: number,
          idList: number
     ) => {
          setComment(cmt || "No comment")
          setIdList(idList)
          setIdMovie(idM)
          setUpdateComment(true)
     }
     const handleClose = () => {
          console.log(1)
          setUpdateComment(false)
          setOpenDelete(false)
          setOpenDeleteListItem(false)
     }

     const handleAgreeUpdateComment = async () => {
          const data = {
               idList: idList,
               accessToken: accessToken,
               idMovie: idMovie,
               comment: comment,
          }
          await dispatch(updateCommentMovie(data))
          toast.success("Update comment movie successfully", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          })
          setUpdateComment(false)
     }
     const handleDeleteItem = async (idL: number, idM: number) => {
          const data = {
               idList: idL,
               accessToken: accessToken,
               idMovie: idM,
          }
          console.log(data)
          await dispatch(deleteItem(data))

          toast.success("Movie deleted successfully", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          })
          // // await dispatch(listFavoriteMovie())

          // const newDataMovieListFavorite: listMovieTypes[] = []
          // const dataUpdate = (await dispatch(
          //      listFavoriteMovieDetail(idL)
          // )) as PayloadAction<listMovieTypes>

          // console.log(data)
          // newDataMovieListFavorite.push(dataUpdate.payload)
          // setDataMovieListFavorite(newDataMovieListFavorite)
     }
     const [idListItem, setIdListItem] = useState<number>(0)
     const handlerClearItemList = async (idL: number) => {
          // const data = {
          //      idList: idL,
          //      accessToken: accessToken,
          // }
          setIdListItem(idL)
          // console.log(data)
          setOpenDeleteListItem(true)

          // await dispatch(clearItemList(data))
     }
     const handlerAgreeClearItemList = async () => {
          const data = {
               idList: idListItem,
               accessToken: accessToken,
          }
          await dispatch(clearItemList(data))
          setOpenDeleteListItem(false)
          toast.success("Delete all movie in list successfully", {
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
     }

     return (
          <>
               <Box>
                    {updateComment ? (
                         <DialogComment
                              open={updateComment}
                              handleClose={handleClose}
                              setComment={setComment}
                              comment={comment}
                              handleAgreeUpdateComment={
                                   handleAgreeUpdateComment
                              }
                         />
                    ) : (
                         ""
                    )}
                    {openDelete || openDeleteListItem ? (
                         <DialogDelete
                              open={openDelete}
                              handleClose={handleClose}
                              handleAgreeDeleteList={handleAgreeDeleteList}
                              openDeleteListItem={openDeleteListItem}
                              handlerAgreeClearItemList={
                                   handlerAgreeClearItemList
                              }
                         />
                    ) : (
                         ""
                    )}

                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>View</TableCell>
                                   <TableCell>Name </TableCell>

                                   <TableCell align="center">
                                        Description
                                   </TableCell>

                                   <TableCell align="right">Delete</TableCell>
                                   <TableCell align="right">Update</TableCell>
                                   <TableCell align="right">
                                        ClearItem
                                   </TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {/* dataSelector dataItemList */}
                              {dataItemList?.map((row, index) => (
                                   <React.Fragment key={index}>
                                        <TableRow>
                                             <TableCell>
                                                  <IconButton
                                                       aria-label="expand row"
                                                       size="small"
                                                       onClick={() => {
                                                            const newOpen = [
                                                                 ...openTable,
                                                            ]
                                                            newOpen[index] =
                                                                 !newOpen[index]
                                                            setOpenTable(
                                                                 newOpen
                                                            )
                                                       }}
                                                  >
                                                       {openTable[index] ? (
                                                            <KeyboardArrowUpIcon />
                                                       ) : (
                                                            <KeyboardArrowDownIcon />
                                                       )}
                                                  </IconButton>
                                             </TableCell>
                                             <TableCell
                                                  component="th"
                                                  scope="row"
                                             >
                                                  {row.name}
                                             </TableCell>

                                             <TableCell align="center">
                                                  {row.description}
                                             </TableCell>
                                             <TableCell
                                                  align="right"
                                                  onClick={() =>
                                                       handlerDeleteList(
                                                            row.id as number
                                                       )
                                                  }
                                             >
                                                  <DeleteIcon />
                                             </TableCell>
                                             <TableCell
                                                  align="right"
                                                  onClick={() =>
                                                       handlerUpdateList(
                                                            row.id as number,
                                                            row.name as string,
                                                            row.description as string
                                                       )
                                                  }
                                             >
                                                  <CreateIcon />
                                             </TableCell>
                                             <TableCell
                                                  align="right"
                                                  onClick={() =>
                                                       handlerClearItemList(
                                                            row.id as number
                                                       )
                                                  }
                                             >
                                                  <DeleteIcon />
                                             </TableCell>
                                        </TableRow>
                                        <TableRow>
                                             <TableCell
                                                  style={{
                                                       paddingBottom: 0,
                                                       paddingTop: 0,
                                                  }}
                                                  colSpan={6}
                                             >
                                                  <Collapse
                                                       in={openTable[index]}
                                                       timeout="auto"
                                                       unmountOnExit
                                                  >
                                                       <Box sx={{ margin: 1 }}>
                                                            <Typography
                                                                 variant="h5"
                                                                 gutterBottom
                                                                 component="div"
                                                            >
                                                                 Detail list
                                                            </Typography>
                                                            {(dataItemList[
                                                                 index
                                                            ]
                                                                 ?.results as resultsMovie[]) ? (
                                                                 <Table aria-label="purchases">
                                                                      <TableHead>
                                                                           <TableRow>
                                                                                <TableCell>
                                                                                     Movie
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                     Category
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                     Comment
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                     Delete
                                                                                </TableCell>
                                                                           </TableRow>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                           {row?.results?.map(
                                                                                (
                                                                                     historyRow,
                                                                                     index
                                                                                ) => (
                                                                                     <TableRow
                                                                                          key={
                                                                                               index
                                                                                          }
                                                                                     >
                                                                                          <TableCell
                                                                                               component="th"
                                                                                               scope="row"
                                                                                               className="flex items-center gap-5"
                                                                                          >
                                                                                               <img
                                                                                                    src={`${URLImg}${historyRow.poster_path}`}
                                                                                                    alt=""
                                                                                                    className="w-[120px] h-[120px]"
                                                                                               />
                                                                                               <Typography>
                                                                                                    {
                                                                                                         historyRow.original_title
                                                                                                    }
                                                                                               </Typography>
                                                                                          </TableCell>

                                                                                          <TableCell>
                                                                                               {dataSelectGenres
                                                                                                    .filter(
                                                                                                         (
                                                                                                              dataGenres
                                                                                                         ) => {
                                                                                                              return historyRow.genre_ids?.some(
                                                                                                                   (
                                                                                                                        genreId
                                                                                                                   ) =>
                                                                                                                        genreId ==
                                                                                                                        dataGenres.id
                                                                                                              )
                                                                                                         }
                                                                                                    )
                                                                                                    .map(
                                                                                                         (
                                                                                                              genre
                                                                                                         ) =>
                                                                                                              genre.name
                                                                                                    )
                                                                                                    .join(
                                                                                                         ", "
                                                                                                    )}
                                                                                          </TableCell>
                                                                                          <TableCell
                                                                                               component="th"
                                                                                               scope="row"
                                                                                          >
                                                                                               <Typography>
                                                                                                    {((
                                                                                                         row?.comments as commentType
                                                                                                    )[
                                                                                                         `${historyRow.media_type}:${historyRow.id}`
                                                                                                    ] as string) !=
                                                                                                    null
                                                                                                         ? ((
                                                                                                                row?.comments as commentType
                                                                                                           )[
                                                                                                                `${historyRow.media_type}:${historyRow.id}`
                                                                                                           ] as string)
                                                                                                         : "No comment"}
                                                                                               </Typography>
                                                                                               <CreateIcon
                                                                                                    onClick={() =>
                                                                                                         handlerUpdateComment(
                                                                                                              (
                                                                                                                   row?.comments as commentType
                                                                                                              )[
                                                                                                                   `${historyRow.media_type}:${historyRow.id}`
                                                                                                              ] as string,
                                                                                                              historyRow.id as number,
                                                                                                              row.id as number
                                                                                                         )
                                                                                                    }
                                                                                               />
                                                                                          </TableCell>
                                                                                          <TableCell>
                                                                                               <DeleteIcon
                                                                                                    onClick={() =>
                                                                                                         handleDeleteItem(
                                                                                                              row.id as number,
                                                                                                              historyRow.id as number
                                                                                                         )
                                                                                                    }
                                                                                               />
                                                                                          </TableCell>
                                                                                     </TableRow>
                                                                                )
                                                                           )}
                                                                      </TableBody>
                                                                 </Table>
                                                            ) : (
                                                                 "There are no movies"
                                                            )}
                                                       </Box>
                                                  </Collapse>
                                             </TableCell>
                                        </TableRow>
                                   </React.Fragment>
                              ))}
                         </TableBody>
                    </Table>
               </Box>
          </>
     )
}
// dataItemList[
//      index
// ]
export default FavoriteMovieHomePage
