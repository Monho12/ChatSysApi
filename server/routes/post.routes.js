const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router
  .get("/posts", getPosts)
  .get("/post/:id", getPost)
  .post("/post", createPost)
  .delete("/post/:id", deletePost);
module.exports.postRoutes = router;
