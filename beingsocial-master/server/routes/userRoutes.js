import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser); //get a particuler user
router.get("/:id/friends", verifyToken, getUserFriends); // get friends of a pertticuler user

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
