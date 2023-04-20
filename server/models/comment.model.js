const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  creator: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = model("comments", commentSchema);

module.exports.Comment = Comment;
