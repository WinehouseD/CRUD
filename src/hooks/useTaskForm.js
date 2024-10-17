import { useState, useEffect } from "react";
import { titleValidation } from "../utils/validation";

const useTaskForm = (initialTitle = "", onSubmit) => {
  const [tasksTitle, setTasksTitle] = useState(initialTitle);
  const [error, setError] = useState("");

  useEffect(() => {
    setTasksTitle(initialTitle);
    setError("");
  }, [initialTitle]);

  const handleChange = (e) => {
    setTasksTitle(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    );
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = titleValidation(tasksTitle);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(tasksTitle);
    setTasksTitle("");
    setError("");
  };

  return {
    tasksTitle,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useTaskForm;
