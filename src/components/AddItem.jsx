import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { titleValidation } from "../utils/validation";

const AddItem = ({ onAddTask }) => {
  const [tasksTitle, setTasksTitle] = useState("");
  const [error, setError] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const validationError = titleValidation(tasksTitle);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAddTask(tasksTitle);
    setTasksTitle("");
    setError("");
  };

  return (
    <Box component="form" onSubmit={addTask}>
      <TextField
        type="text"
        variant="outlined"
        id="outlined-basic"
        autoComplete="off"
        label="Task name"
        value={tasksTitle}
        onChange={(e) => {
          setTasksTitle(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          );
          setError("");
        }}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Box display="flex" justifyContent="center" mt={1}>
        <Button
          size="middle"
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "var(--primary-color)" }}
          aria-label="Add Task"
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default AddItem;
