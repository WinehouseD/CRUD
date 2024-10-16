import { Button } from "@mui/material";
import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const LogoutButton = () => {
  const { logout } = useKindeAuth();

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          zIndex: 1000,
          color: "white",
          textAlign: "right",
          right: "1rem",
          position: "fixed",
          fontSize: "1rem",
          top: "0.8rem",
        }}
        onClick={() => logout()}
        type="button"
        aria-label="Log out"
      >
        Log out
      </Button>
    </>
  );
};

export default LogoutButton;
