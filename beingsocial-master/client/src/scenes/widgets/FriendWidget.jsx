import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { setFriends } from "../../states";

const FriendWidget = ({ friendId, name, subTitle, userPicturePath }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === friendId);
  // const isFriend = false;

  const patchFriend = async () => {
    const patchResponse = await fetch(
      `http://localhost:8080/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "appliction/json",
        },
      }
    );
    const friendsData = await patchResponse.json();
    dispatch(setFriends({ friends: friendsData }));
    console.log(friendsData);
  };

  return (
    <FlexBetween>
      <FlexBetween
        gap="1rem"
        onClick={() => {
          Navigate(`/profile/${friendId}`);
          Navigate(0);
        }} // we are using this Navigate(0) because when we naviget to a perticuler user profile by any other perticuler profile its just pushing parameter if we don't use
      >
        <UserImage image={userPicturePath} size="50px" />
        <Box>
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="550"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize="0.8rem">
            {subTitle}
          </Typography>
        </Box>
      </FlexBetween>

      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: palette.neutral.light,
            p: "0.6rem",
            "&:hover": {
              backgroundColor: palette.primary.light,
            },
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
          ) : (
            <PersonAddOutlined />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default FriendWidget;
