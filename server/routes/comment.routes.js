const express = require("express");
const {
  createComment,
  deleteComment,
  getComments,
  addCommentsToPost,
} = require("../controller/comment.controller");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .get("/comments", getComments)
  .post("/create", createComment)
  .put("/add", addCommentsToPost)
  .delete("/comment/:id", roleMiddleware, deleteComment);

module.exports.commentRoutes = router;
