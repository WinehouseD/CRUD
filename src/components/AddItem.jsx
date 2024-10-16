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
    <Box>
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
      <Button
        type="button"
        variant="contained"
        sx={{ backgroundColor: "var(--primary-color)" }}
        style={{ marginTop: "0.6rem" }}
        onClick={addTask}
        aria-label="Add Task"
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddItem;
