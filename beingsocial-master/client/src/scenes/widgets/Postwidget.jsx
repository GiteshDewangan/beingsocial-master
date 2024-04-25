import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme, Divider } from "@mui/material";

import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ChatBubbleOutline,
  ShareOutlined,
} from "@mui/icons-material";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import FriendWidget from "./FriendWidget";
import { setPost } from "../../states";

const Postwidget = ({
  postId,
  postUserId,
  firstName,
  lastName,
  userPicturePath,
  picturePath,
  description,
  location,
  likes,
  createdAt,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user._id); // there loggedInUserId means userId which is logged in
  const isUserLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;
  const patchLike = async () => {
    const patchLikeResponse = await fetch(
      `http://localhost:8080/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await patchLikeResponse.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <>
      <WidgetWrapper m="1.5rem auto">
        <FriendWidget
          friendId={postUserId}
          name={`${firstName} ${lastName}`}
          subTitle={location}
          userPicturePath={userPicturePath}
        />
        {picturePath && (
          <img
            src={`http://localhost:8080/assets/${picturePath}`}
            alt="post"
            width="100%"
            height="100%"
            style={{ borderRadius: "10px", margin: "1rem auto" }}
          />
        )}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "0.95rem",
            margin: "1rem",
          }}
        >
          {description}
        </Typography>

        <Divider />

        <FlexBetween
          sx={{
            marginTop: "1rem",
          }}
        >
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.5rem">
              <IconButton onClick={patchLike}>
                {isUserLiked ? (
                  <FavoriteOutlined
                    sx={{
                      color: palette.primary.main,
                    }}
                  />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likesCount}</Typography>
            </FlexBetween>
            <FlexBetween
              gap="0.5rem"
              onClick={() => setIsComments(!isComments)}
            >
              <IconButton>
                <ChatBubbleOutline />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box>
            {comments.map((comment, index) => (
              <Box key={index}>
                <Divider />
                <Typography
                  sx={{
                    color: palette.neutral.main,
                    backgroundColor: palette.neutral.light,
                    borderRadius: "5px",
                    p: "0.5rem",
                    my: "0.3rem",
                  }}
                >
                  {comment}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default Postwidget;
