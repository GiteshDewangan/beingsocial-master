import React from "react";
import Navbar from "../Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import CreatePost from "../widgets/CreatePost";
import AllPosts from "../widgets/AllPosts";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} m="1rem auto" >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "48%" : undefined} m="1rem auto">
          <CreatePost picturePath={picturePath}/>
          <AllPosts userId={_id}/>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined} m="1rem auto">
          <FriendListWidget userId={_id}/>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
