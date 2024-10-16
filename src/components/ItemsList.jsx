import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import { Container, Typography, List, Box, Button } from "@mui/material";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link } from "react-router-dom";

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

  const addTask = useCallback((title) => {
    setTasks((prevTasks) => [
      {
        id: uuidv4(),
        title,
        status: false,
      },
      ...prevTasks,
    ]);
  }, []);

  const updateStatus = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const handleEditTask = useCallback((id) => {
    setEditTaskId(id);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditTaskId(null);
  }, []);

  const editTask = useCallback(
    (id, title) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
      );
      handleCloseEditModal();
    },
    [handleCloseEditModal]
  );

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  return (
    <Container maxWidth="lg">
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "var(--primary-color)",
          fontSize: "2.7rem",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        Welcome back, {user?.given_name || "Friend"}!
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
      {tasks.length > 0 ? (
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
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="50vh"
        >
          <Typography sx={{ fontSize: "1rem" }}>
            Unfortunately, there are no tasks available. Add a new task to get
            started!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ItemsList;
