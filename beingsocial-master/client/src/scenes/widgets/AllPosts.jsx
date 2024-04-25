import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Postwidget from "./Postwidget";
import { setPosts } from "../../states";

const AllPosts = ({ userId, isProfilePage = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // console.log(posts);

  const getAllPosts = async () => {
    const feedPostResponse = await fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const feedPosts = await feedPostResponse.json();
    dispatch(setPosts({ posts: feedPosts }));
    // console.log("allposts: ", feedPosts);
  };

  const getUserPosts = async () => {
    const anyUserPostsResponse = await fetch(
      `http://localhost:8080/posts/${userId}/posts`,
      {
        method: "GEt",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const anyUserPosts = await anyUserPostsResponse.json();
    
    dispatch(setPosts({ posts: anyUserPosts }));
  };
  useEffect(() => {
    isProfilePage ? getUserPosts() : getAllPosts();
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          userPicturePath,
          picturePath,
          description,
          location,
          likes,
          createdAt,
          comments,
        }) => (
          <Postwidget
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            userPicturePath={userPicturePath}
            picturePath={picturePath}
            description={description}
            location={location}
            likes={likes}
            createdAt={createdAt}
            comments={comments}
          />
        )
      ).reverse()}
    </>
  );
};

export default AllPosts;
