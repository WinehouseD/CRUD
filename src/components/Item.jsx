import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Divider,
  Box,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Item = ({
  id,
  title,
  status,
  onUpdateStatus,
  onRemoveTask,
  onEditTask,
}) => {
  return (
    <Box>
      <ListItem sx={{ display: "flex", alignItems: "center", pr: 0 }}>
        <ListItemIcon sx={{ minWidth: "0", mr: 2 }}>
          <Checkbox
            edge="start"
            checked={status}
            onChange={() => onUpdateStatus(id)}
            aria-label="toggle status"
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            textDecoration: status ? "line-through" : "none",
            wordBreak: "break-word",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onEditTask} edge="end" aria-label="edit">
            <EditIcon sx={{ color: "var(--primary-color)" }} />
          </IconButton>
          <IconButton
            onClick={() => onRemoveTask(id)}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default Item;
