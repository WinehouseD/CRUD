import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const ItemsList = () => {
  const { user } = useKindeAuth();
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setLoading(false);
  }, []);

  const addTask = (title) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: uuidv4(),
        title,
        status: false,
      },
    ]);
  };

  const updateStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    setEditTaskId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditTaskId(null);
  };

  const editTask = (id, title) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
    handleCloseEditModal();
  };

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Welcome back, {user?.given_name || "Friend"}
      </Typography>
      {editTaskId !== null && (
        <EditItem
          taskToEdit={tasks.find((task) => task.id === editTaskId)}
          onEditTask={editTask}
          open={isEditModalOpen}
          handleClose={handleCloseEditModal}
        />
      )}
      <AddItem onAddTask={addTask} />
      <List>
        {tasks.map((task) => (
          <Item
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            onUpdateStatus={updateStatus}
            onRemoveTask={removeTask}
            onEditTask={() => handleEditTask(task.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default ItemsList;
