import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  CircularProgress,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";

function SignIn() {
  const { login, register, isLoading, isAuthenticated } = useKindeAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {isLoading ? (
        <CircularProgress size={40} color="neutral" />
      ) : (
        !isAuthenticated && (
          <Box textAlign="center">
            <Typography variant="h2" gutterBottom>
              Welcome
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1">
                Stay organized and manage your tasks efficiently with my ToDo
                app
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "var(--primary-color)", height: 40 }}
                onClick={login}
                type="button"
                aria-label="Log In"
              >
                Log In
              </Button>
              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                }}
                color="primary"
                onClick={register}
                type="button"
                aria-label="Register"
              >
                Register
              </Button>
            </Stack>
          </Box>
        )
      )}
    </Box>
  );
}

export default SignIn;
