import BSUser from "../models/user.js";
import BSPost from "../models/post.js";

// creating new Post
export const createPost = async (req, res) => {
  try {
    const { userId, postDescription, picturePath } = req.body;
    const user = await BSUser.findById(userId);

    const newPost = new BSPost({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: postDescription,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await BSPost.find();
    res.status(201).json(post); // now sending all the posts after adding a post
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// grabbing all the posts
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await BSPost.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await BSPost.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// updating like numbers
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    console.log("bhai UserId: ", userId);
    const post = await BSPost.findById(postId);
    const isLiked = post.likes.get(userId);
    console.log("Bhai yahan tk sahi h ");
    // console.log(post);
    console.log("isLiked: ", isLiked);

    if (isLiked) {
      console.log("Bhai add kiya hu");
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
      console.log("Bhai hta diya hu");
    }

    const updatedPost = await BSPost.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
    console.log("ye hua ya nhi?");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
