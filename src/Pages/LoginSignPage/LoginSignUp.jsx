import Form from "./Form";
import React, { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmailVerification from "./EmailVerification";
import ChangePass from "./ChangePassword/ChangePass";

export const LoginSignUp = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const { page } = useParams();

  useEffect(() => {
    // Check if the 'page' parameter exists and is not one of 'changepass' or 'verifyemail'.
    if (
      page &&
      ["changepass", "verifyemail"].filter((m) => m === page).length === 0
    ) {
      // If not, navigate to the 404 page.
      navigate("/404", { state: null });
    }
  });

  return (
    <Box>
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={"bold"} fontSize="32px" color={"primary"}>
          Authentication To WebApp
        </Typography>
      </Box>
      <Box
        p="2rem"
        m={"2rem auto"}
        border="2px solid"
        borderRadius={"1.5rem"}
        width={isNonMobileScreens ? "40%" : "90%"}
      >
        {page === "verifyemail" ? (
          // Display the EmailVerification component if 'page' is 'verifyemail'.
          <EmailVerification />
        ) : page === "changepass" ? (
          // Display the ChangePass component if 'page' is 'changepass'.
          <ChangePass />
        ) : (
          // Display the Form component for login if 'page' is not defined.
          !page && <Form pgType={"Login"} />
        )}
      </Box>
    </Box>
  );
};
