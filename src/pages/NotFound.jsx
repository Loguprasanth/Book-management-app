import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <Button variant="contained" component={Link} to="/">
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
