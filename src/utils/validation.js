export const titleValidation = (title) => {
  if (title.trim() === "") {
    return "Task name cannot be empty.";
  }
  return "";
};
