import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { titleValidation } from "../utils/validation";

const EditItem = ({ taskToEdit, onEditTask, open, handleClose }) => {
  const [tasksTitle, setTasksTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTasksTitle(taskToEdit.title);
      setError("");
    }
  }, [taskToEdit]);

  const editTask = useCallback(
    (e) => {
      e.preventDefault();
      const validationError = titleValidation(tasksTitle);
      if (validationError) {
        setError(validationError);
        return;
      }
      onEditTask(taskToEdit.id, tasksTitle);
      handleClose();
    },
    [tasksTitle, taskToEdit, onEditTask, handleClose]
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
          onChange={(e) => {
            setTasksTitle(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            );
            setError("");
          }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions sx={{ pb: "1rem" }}>
        <Button
          onClick={editTask}
          variant="contained"
          aria-label="Save"
          sx={{ width: "6rem" }}
        >
          Save
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          aria-label="Cancel"
          sx={{ width: "6rem" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItem;
