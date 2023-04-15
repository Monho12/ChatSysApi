const { Message } = require("../models/message.model");
const { User } = require("../models/user.model");

const getMsg = async (req, res) => {
  try {
    const result = await Message.findById(req.params.id).populate("creator");
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getMsgs = async (_req, res) => {
  try {
    const result = await Message.find().populate("creator");
    res.send(result);
  } catch (err) {
    res.sendStatus(404);
  }
};

const createMsg = async (req, res) => {
  const { creator, mainText } = req.body;
  try {
    const result = await new Message({ mainText, creator }).save();
    const user = await User.findById(creator);
    user.Message.push(result._id);
    await user.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const deleteMsg = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Message.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {}
};

module.exports = { createMsg, getMsg, getMsgs, deleteMsg };
