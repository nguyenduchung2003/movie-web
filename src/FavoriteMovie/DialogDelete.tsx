import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"

import DialogTitle from "@mui/material/DialogTitle"
interface Prop {
     open: boolean
     openDeleteListItem: boolean
     handleClose: () => void
     handleAgreeDeleteList: () => Promise<void>
     handlerAgreeClearItemList: () => Promise<void>
}
const DialogDelete = ({
     open,
     openDeleteListItem,
     handleClose,
     handleAgreeDeleteList,
     handlerAgreeClearItemList,
}: Prop) => {
     return (
          <>
               <Dialog
                    open={openDeleteListItem ? openDeleteListItem : open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         {openDeleteListItem
                              ? "Do you want to delete all items in the list?"
                              : "Do you want to delete this list? "}
                    </DialogTitle>

                    <DialogActions>
                         <Button onClick={handleClose}>Disagree</Button>
                         <Button
                              onClick={
                                   openDeleteListItem
                                        ? handlerAgreeClearItemList
                                        : handleAgreeDeleteList
                              }
                         >
                              Agree
                         </Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
export default DialogDelete
