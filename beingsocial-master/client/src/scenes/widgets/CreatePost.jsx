import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  InputBase,
} from "@mui/material";

import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Padding,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";

import { setPosts } from "../../states";

const CreatePost = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    console.log(postDescription);
    formData.append("postDescription", postDescription);
    if (postImage) {
      //   formData.append("postImage", postImage);
      formData.append("picturePath", postImage.name);
    }

    const response = await fetch(`http://localhost:8080/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const posts = await response.json();
    console.log(posts);
    if (posts) {
      // setting all the posts that we get from the backend after creating new post
      dispatch(setPosts({ posts }));

      // clearing the Dropdown field and Image field
      setPostImage(null);
      setPostDescription("");
      setIsImage(!isImage)
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="2rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's in your mind..."
          onChange={(e) => setPostDescription(e.target.value)}
          value={postDescription}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            p: "0.7rem 1rem",
            borderRadius: "10px",
            fontSize: "0.95rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          gridColumn="span 4"
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          p="1rem"
          m="1rem auto"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) => setPostImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  borderRadius="5px"
                  width={postImage ? "89%" : "100%"}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {postImage ? (
                    <FlexBetween color={palette.primary.main}>
                      <Typography>{postImage.name}</Typography>
                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </FlexBetween>
                  ) : (
                    <p style={{ textAlign: "left" }}>
                      Add or Drop Picture here...
                    </p>
                  )}
                </Box>
                {postImage && (
                  <IconButton>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1rem 0" }} />

      <FlexBetween p="1rem" flexWrap="wrap">
        <FlexBetween
          onClick={() => setIsImage(!isImage)}
          gap="0.5rem"
          sx={{
            backgroundColor: palette.neutral.light,
            padding: "0.5rem 0.6rem",
            borderRadius: "7px",
            "&:hover": {
              backgroundColor: palette.primary.light,
            },
          }}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap="0.5rem"
              sx={{
                backgroundColor: palette.neutral.light,
                padding: "0.5rem 0.6rem",
                borderRadius: "7px",
                "&:hover": {
                  backgroundColor: palette.primary.light,
                },
              }}
            >
              <GifBoxOutlined />
              <Typography>Clip</Typography>
            </FlexBetween>
            <FlexBetween
              gap="0.5rem"
              sx={{
                backgroundColor: palette.neutral.light,
                padding: "0.5rem 0.6rem",
                borderRadius: "7px",
                "&:hover": {
                  backgroundColor: palette.primary.light,
                },
              }}
            >
              <AttachFileOutlined />
              <Typography>Attach</Typography>
            </FlexBetween>
          </>
        ) : (
          <></>
        )}
        <Button
          variant="contained"
          onClick={handlePost}
          disabled={!postDescription}
          sx={{
            padding: "0.36rem 2rem",
            borderRadius: "7px",
            fontSize: "0.9rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default CreatePost;
