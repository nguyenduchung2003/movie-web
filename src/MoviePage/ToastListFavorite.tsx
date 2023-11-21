import {
     // useState,
     useRef,
} from "react"
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import FormControlLabel from "@mui/material/FormControlLabel"
import {
     //  useDispatch,
     useSelector,
} from "react-redux"
import {
     // AppDispatch,
     RootState,
} from "../Store/store"
import { Typography, Box } from "@mui/material"

interface Props {
     id?: number
     handleCancel: () => void
     handleOk: () => void
     open: boolean
     valueIdList: string
     handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const ToastListFavorite = ({
     handleCancel,
     handleOk,
     open,
     handleChange,
     valueIdList,
}: Props) => {
     const dataSelector = useSelector(
          (state: RootState) => state.favoriteMovie.resultsFavoriteItems
     )
     // const dataSelector = useSelector(
     //      (state: RootState) => state.favoriteMovie.resultsFavoriteFilter
     // )

     console.log(dataSelector)
     // console.log(dataSelector)
     // const [openChildren, setOpenChildren] = useState(open)

     // const options = dataSelector
     // console.log(openChildren)
     const radioGroupRef = useRef<HTMLElement>(null)

     const handleEntering = () => {
          if (radioGroupRef.current != null) {
               radioGroupRef.current.focus()
          }
     }

     // const handleCancel = () => {
     //      setOpenChildren(false)
     // }

     // const handleOk = () => {
     //      setOpenChildren(false)
     // }
     // const [value, setValue] = useState("")
     // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     //      setValue((event.target as HTMLInputElement).value)
     // }
     return (
          <>
               <Dialog
                    sx={{
                         "& .MuiDialog-paper": {
                              width: "80%",
                              maxHeight: 435,
                         },
                    }}
                    maxWidth="xs"
                    TransitionProps={{ onEntering: handleEntering }}
                    open={open}
               >
                    <DialogTitle>Danh sach phim yeu thich</DialogTitle>
                    {dataSelector?.length == 0 ? (
                         <Box className="flex justify-center items-center">
                              <Typography>
                                   Chưa có list yêu thích nào
                              </Typography>
                              <Button onClick={handleCancel}>Cancel</Button>
                         </Box>
                    ) : (
                         <>
                              <DialogContent dividers>
                                   <RadioGroup
                                        ref={radioGroupRef}
                                        aria-label="ringtone"
                                        name="ringtone"
                                        value={valueIdList}
                                        onChange={handleChange}
                                   >
                                        {dataSelector?.map((option) => (
                                             <FormControlLabel
                                                  value={option.id}
                                                  key={option.id}
                                                  control={<Radio />}
                                                  label={option.name}
                                             />
                                        ))}
                                   </RadioGroup>
                              </DialogContent>

                              <DialogActions>
                                   <Button onClick={handleCancel}>
                                        Cancel
                                   </Button>
                                   <Button onClick={handleOk}>Ok</Button>
                              </DialogActions>
                         </>
                    )}
               </Dialog>
          </>
     )
}
export default ToastListFavorite
