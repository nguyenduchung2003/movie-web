import {
     Button,
     Box,
     DialogTitle,
     DialogContent,
     Dialog,
     DialogActions,
     TextField,
} from "@mui/material"
interface Props {
     open: boolean
     handleClose: () => void
     listName: string
     setListName: React.Dispatch<React.SetStateAction<string>>
     listDescription: string
     setListDescription: React.Dispatch<React.SetStateAction<string>>
     handleAgreeAdd: () => Promise<void>
     updateList: boolean
     handleAgreeUpdate: () => Promise<void>
}

const DialogList = ({
     open,
     handleClose,
     listName,
     setListName,
     listDescription,
     setListDescription,
     handleAgreeAdd,
     updateList,
     handleAgreeUpdate,
}: Props) => {
     return (
          <>
               <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         {updateList
                              ? "Update List Favorite Movie"
                              : "Add List Favorite Movie"}
                    </DialogTitle>
                    <DialogContent className="flex flex-col ">
                         <Box>
                              <TextField
                                   variant="standard"
                                   label="  Name List"
                                   value={listName}
                                   onChange={(e) => setListName(e.target.value)}
                              ></TextField>
                         </Box>

                         <TextField
                              variant="standard"
                              label="Description"
                              value={listDescription}
                              onChange={(e) =>
                                   setListDescription(e.target.value)
                              }
                         ></TextField>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Disagree</Button>
                         <Button
                              onClick={
                                   updateList
                                        ? handleAgreeUpdate
                                        : handleAgreeAdd
                              }
                         >
                              Agree
                         </Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
export default DialogList
