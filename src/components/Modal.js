import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Modal = ({
  actionButtonText,
  actionDescription,
  closeButtonText,
  open,
  onAction,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        <DialogContentText>{actionDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAction} color="primary">
          {actionButtonText}
        </Button>
        <Button onClick={onClose} color="secondary">
          {closeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
