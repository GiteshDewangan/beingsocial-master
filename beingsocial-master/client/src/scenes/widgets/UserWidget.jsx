import React, { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  LaunchOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  MailOutlineOutlined,
  LinkedIn,
  Twitter,
  Instagram,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);

  const Navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const userResponse = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await userResponse.json();
    setUser(userData);
    console.log(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;
  const { firstName, lastName, email, friends, location, occupation } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        sx={{
          cursor: "pointer",
        }}
        onClick={() => Navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color={dark}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <IconButton>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* Second row */}
      <Box p="1rem 0">
        <Box display="flex" gap="1rem" mb="0.7rem">
          <MailOutlineOutlined />
          <Typography>{email}</Typography>
        </Box>
        <Box display="flex" gap="1rem" mb="0.7rem">
          <LocationOnOutlined />
          <Typography>{location}</Typography>
        </Box>

        <Box display="flex" gap="1rem" mt="0.7rem">
          <WorkOutlineOutlined />
          <Typography>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Third row */}
      <Box p="1rem 0">
        <Typography fontSize="1.2rem" fontWeight="bold">
          Social Profiles
        </Typography>

        <FlexBetween my="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography fontWeight="bold">Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <LaunchOutlined cursor="pointer" />
          </IconButton>
        </FlexBetween>

        <FlexBetween my="0.5rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography fontWeight="bold">LinkedIn</Typography>
              <Typography color={medium}>Job Network Platform</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <LaunchOutlined cursor="pointer" />
          </IconButton>
        </FlexBetween>

        <FlexBetween my="0.5rem">
          <FlexBetween gap="1rem">
            <Instagram />
            <Box>
              <Typography fontWeight="bold">Instagram</Typography>
              <Typography color={medium}>Content Sharing Platform</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <LaunchOutlined cursor="pointer" />
          </IconButton>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
