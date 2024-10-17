import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import useTaskForm from "../hooks/useTaskForm";

const EditItem = ({ taskToEdit, onEditTask, open, handleClose }) => {
  const [initialTitle, setInitialTitle] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setInitialTitle(taskToEdit.title);
    }
  }, [taskToEdit]);

  const { tasksTitle, error, handleChange, handleSubmit } = useTaskForm(
    initialTitle,
    (title) => {
      onEditTask(taskToEdit.id, title);
      handleClose();
    }
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ style: { borderRadius: 10 } }}
      fullWidth
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Update the task name:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="taskName"
          type="text"
          fullWidth
          multiline
          rows={5}
          value={tasksTitle}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary-color)",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: "1rem" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          aria-label="Save"
          sx={{ width: "6rem", backgroundColor: "var(--primary-color)" }}
        >
          Save
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          aria-label="Cancel"
          sx={{
            width: "6rem",
            borderColor: "var(--primary-color)",
            color: "var(--primary-color)",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItem;
