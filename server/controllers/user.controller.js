const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (_req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id).populate("Message");
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id).populate("Message");
    res.send(result);
  } catch (error) {}
};

const addUserMsg = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const user = await User.findById(userId).populate("Message");
    user.Message.push(postId);
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

const Verify = async (req, res) => {
  if (req.headers.authorization) {
    try {
      await jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        (error, item) => {
          if (!error) {
            res.send(item);
          }
        }
      );
    } catch (error) {
      res.status(401);
    }
  } else {
    res.status(404).send("Authentication required");
  }
};

module.exports = { getUsers, getUser, Verify, deleteUser, addUserMsg };
