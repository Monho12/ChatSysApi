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

module.exports = { getUsers, getUser, deleteUser };
