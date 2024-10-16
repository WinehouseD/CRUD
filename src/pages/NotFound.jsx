import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h3">Page not found :(</Typography>
      <p className="pb-2">
        Unfortunately, the page that you're looking for does not exist.
      </p>
      <Button
        variant="contained"
        sx={{ backgroundColor: "var(--primary-color)" }}
        aria-label="Back to Home"
      >
        <Link
          to="/"
          replace
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Back to Home
        </Link>
      </Button>
    </Box>
  );
};

export default NotFound;
