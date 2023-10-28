import { Button } from "@mui/material";
import FlexBetween from "Components/StyledComponents/FlexBetween";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <FlexBetween>
      {location.state} PageNotFound
      <Button onClick={() => navigate("/")}>
        Click Here to redirect to Home Page
      </Button>
    </FlexBetween>
  );
};

export default PageNotFound;
