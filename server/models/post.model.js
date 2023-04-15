const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  imageUrls: [
    {
      type: String,
    },
  ],

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "chatUser",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = model("chatPost", postSchema);

module.exports.Post = Post;
