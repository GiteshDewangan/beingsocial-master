import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const { palette } = useTheme(); //destructuring palette (theme.palette) from useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <>
      <Box>
        <Box
          width="100%"
          bgcolor={palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography
            fontWeight="Bold"
            variant="h3"
            color={palette.primary.main}
            sx={{ "&:hover": { color: palette.primary.light } }}
          >
            BeingSocial
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "60%" : "90%"}
          p="2rem"
          textAlign="center"
          m="1rem auto"
          bgcolor={palette.background.alt}
          borderRadius="10px"
        >
          <Typography fontWeight="bold" variant="h6" sx={{ mb: "1.5rem" }}>
            Welcome to BeingSocial,
            <br />
            be a Social and Explore Everythin on the Internet
          </Typography>
          <Form/>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
