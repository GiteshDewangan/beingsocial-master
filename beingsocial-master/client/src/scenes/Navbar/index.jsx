import React, { useState } from "react";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
  Container,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "../../states";
import { useNavigate } from "react-router-dom";

import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  // console.log(user);

  const fullName =
    `${user.firstName} ${user.lastName}`.length > 12
      ? user.firstName
      : `${user.firstName} ${user.lastName}`;

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color={"primary"}
            onClick={() => Navigate("/")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            BeingSocial
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              bgcolor={neutralLight}
              borderRadius="10px"
              padding="0.2rem 1rem"
              gap="3rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DeskTop Nav */}
        {isNonMobileScreens ? (
          <FlexBetween gap="1rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode == "dark" ? (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                input={<InputBase />}
                sx={{
                  bgcolor: neutralLight,
                  gap: "2rem",
                  borderRadius: "6px",
                  p: "0.2rem 1.5rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu
              sx={{
                fontSize: "25px",
              }}
            />
          </IconButton>
        )}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            zIndex="10"
            maxWidth="300px"
            minWidth="200px"
            height="100%"
            borderRadius="15px 0 0 0"
            bgcolor={alt}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            </Box>
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              <Button
                onClick={() => dispatch(setMode())}
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                {theme.palette.mode == "dark" ? (
                  <>
                    <LightMode sx={{ fontSize: "25px" }} />
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      Light Mode
                    </Typography>
                  </>
                ) : (
                  <>
                    <DarkMode sx={{ fontSize: "25px" }} />
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      Dark Mode
                    </Typography>
                  </>
                )}
              </Button>
              <Container
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "start",
                  alignItems: "center",
                  marginLeft: "0.95rem",
                }}
              >
                <Message sx={{ fontSize: "25px" }} />
                <Typography sx={{ fontSize: "0.9rem" }}>Message</Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "start",
                  alignItems: "center",
                  marginLeft: "0.95rem",
                }}
              >
                <Notifications sx={{ fontSize: "25px" }} />
                <Typography sx={{ fontSize: "0.9rem" }}>
                  Notification
                </Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "start",
                  alignItems: "center",
                  marginLeft: "0.95rem",
                }}
              >
                <Help sx={{ fontSize: "25px" }} />
                <Typography sx={{ fontSize: "0.9rem" }}>Help</Typography>
              </Container>
              <FormControl variant="filled" value={fullName}>
                <Select
                  value={fullName}
                  input={<InputBase />}
                  sx={{
                    bgcolor: neutralLight,
                    borderRadius: "6px",
                    gap: "2rem",
                    p: "0.2rem 1.5rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default Navbar;
