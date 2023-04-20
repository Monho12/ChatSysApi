const express = require("express");
const {
  getComments,
  createComment,
  addCommentsToPost,
  deleteComment,
} = require("../controllers/comment.controller");

const router = express.Router();

router
  .get("/comments", getComments)
  .post("/create", createComment)
  .put("/add", addCommentsToPost)
  .delete("/comment/:id", deleteComment);

module.exports.commentRoutes = router;
