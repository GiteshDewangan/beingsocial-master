import React, { useEffect } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import FriendWidget from "./FriendWidget";
import FlexBetween from "../../components/FlexBetween";
import { setFriends } from "../../states";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriens = async () => {
    const friendsResponse = await fetch(
      `http://localhost:8080/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const friendsList = await friendsResponse.json();
    // console.log("FriendsList of that user: ", friendsList);
    dispatch(setFriends({ friends: friendsList }));
  };

  useEffect(() => {
    getFriens();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        sx={{
          color: palette.neutral.dark,
          fontWeight: "550",
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      >
        Friends List
      </Typography>
      <Box
        display="flex"
        gap="1.4rem"
        flexDirection="column"
        margin="2rem auto"
      >
        {friends.map((friend) => (
          <FriendWidget
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
            subTitle={friend.occupation}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
