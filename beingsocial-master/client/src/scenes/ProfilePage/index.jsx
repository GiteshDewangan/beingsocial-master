import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import UserWidget from "../widgets/UserWidget";
import FriendWidget from "../widgets/FriendWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AllPosts from "../widgets/AllPosts";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const userDetailsResponse = await fetch(
      `http://localhost:8080/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userDetails = await userDetailsResponse.json();
    setUser(userDetails);
    console.log(userDetails);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"} gap="2rem" justifyContent="center" >
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined} m="1.5rem 0">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem auto"/>
          <FriendListWidget userId={userId} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "45%" : undefined} >
          
          <AllPosts userId={userId} isProfilePage={true} />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
