import { Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "1.25rem",
          textAlign: "left",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          letterSpacing: "2px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        TODOS
      </Typography>
    </>
  );
};

export default Header;
