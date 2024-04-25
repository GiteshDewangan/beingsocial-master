import BSUser from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await BSUser.findById(id);
    // setting user to new variable userData and don't include password and version
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picturePath: user.picturePath,
      friends: user.friends,
      location: user.location,
      occupation: user.occupation,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json(userData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await BSUser.findById(id);

    // grabbing all data of all friends of user
    const friends = await Promise.all(
      user.friends.map((id) => BSUser.findById(id))
    );

    // grabbing all data of all friends of user
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return {
          _id,
          firstName,
          lastName,
          picturePath,
          location,
          occupation,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    if (id === friendId) {
      return res.status(404).json({ message: "you can't make yourself a friend" });
    }
    const user = await BSUser.findById(id); // grabbing the user
    const friend = await BSUser.findById(friendId); // grabbing that perticuler friend

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); // removing that friend from user list
      friend.friends = friend.friends.filter((id) => id !== id); // removing user from that friendList
    } else {
      user.friends.push(friendId); // adding that friend from user list
      friend.friends.push(id); // adding user from that friendList
    }
    await user.save();
    await friend.save();

    // grabbing all data of all friends of user
    const friends = await Promise.all(
      user.friends.map((id) => BSUser.findById(id))
    );

    // formatting data of all friends of user
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return {
          _id,
          firstName,
          lastName,
          picturePath,
          location,
          occupation,
        };
      }
    );
    console.log("Bhai ye: ", formattedFriends);
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
