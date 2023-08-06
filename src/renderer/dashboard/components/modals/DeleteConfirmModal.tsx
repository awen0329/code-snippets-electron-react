import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@UILibrary';

export default function DeleteConfirmModal({
  open,
  onOK,
  onCancel,
}: {
  open: boolean;
  onOK: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>Do you want to delete this snippet?</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onOK}>
          Delete
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
