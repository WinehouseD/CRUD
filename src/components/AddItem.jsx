import React from "react";
import { TextField, Button, Box } from "@mui/material";
import useTaskForm from "../hooks/useTaskForm";

const AddItem = ({ onAddTask }) => {
  const { tasksTitle, error, handleChange, handleSubmit } = useTaskForm(
    "",
    onAddTask
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        type="text"
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
        variant="outlined"
        id="outlined-basic"
        autoComplete="off"
        label="Task name"
        value={tasksTitle}
        onChange={handleChange}
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
