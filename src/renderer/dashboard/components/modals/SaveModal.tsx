import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@UILibrary';

export default function SaveModal({
  open,
  onSave,
  onDiscard,
}: {
  open: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>Save</DialogTitle>
      <DialogContent>Do you want to save changes?</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
        <Button onClick={onDiscard}>Discard</Button>
      </DialogActions>
    </Dialog>
  );
}
