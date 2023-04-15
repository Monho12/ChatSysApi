const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");

exports.getPosts = async (_req, res) => {
  const result = await Post.find({}).populate("creatorId");
  res.send(result);
};

exports.getPost = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id).populate("creatorId");
    res.send(result);
  } catch (error) {
    res.status(401);
  }
};

exports.createPost = async (req, res) => {
  const { title, creatorId, imageUrls } = req.body;
  try {
    const result = await Post.create({
      title,
      creatorId,
      imageUrls,
    });
    const user = await User.findById(creatorId);
    user.Posts.push(result._id);
    await user.save();
    res.send(result);
  } catch (err) {
    res.status(404).send("error");
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Post.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {}
};
