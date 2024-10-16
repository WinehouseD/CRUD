import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Divider,
  Box,
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
      <ListItem>
        <ListItemText
          primary={title}
          sx={{ textDecoration: status ? "line-through" : "none" }}
        />
        <ListItem
          secondaryAction={
            <>
              <Checkbox
                edge="end"
                checked={status}
                onChange={() => onUpdateStatus(id)}
                aria-label="toggle status"
              />
              <IconButton onClick={onEditTask} edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onRemoveTask(id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        ></ListItem>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default Item;
