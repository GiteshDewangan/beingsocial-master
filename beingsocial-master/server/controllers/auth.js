import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BSUser from "../models/user.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new BSUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await BSUser.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist! " });

    //comparing requested password and user password from database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials! " });

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
    };

    //assigning a new token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token, userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const AuthVerification = (req, res) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) return res.status(500).send("Access Denied");

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(verified);
//     if (verified) {
//       res.status(200).json({ Authorized: true });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
