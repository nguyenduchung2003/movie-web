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
     comment: string
     setComment: React.Dispatch<React.SetStateAction<string>>
     handleAgreeUpdateComment: () => Promise<void>
}
const DialogComment = ({
     open,
     handleClose,
     comment,
     setComment,
     handleAgreeUpdateComment,
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
                         {"Update Movie Comment"}
                    </DialogTitle>
                    <DialogContent className="flex flex-col ">
                         <Box>
                              <TextField
                                   variant="standard"
                                   label="Comment"
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}
                              ></TextField>
                         </Box>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Disagree</Button>
                         <Button onClick={handleAgreeUpdateComment}>
                              Agree
                         </Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
export default DialogComment
