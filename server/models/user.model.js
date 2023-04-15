const { Schema, model } = require("mongoose");

const userShema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  Posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "chatPost",
    },
  ],
  Message: [
    {
      type: Schema.Types.ObjectId,
      ref: "chatMessage",
    },
  ],

  profilePic: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("chatUser", userShema);
module.exports.User = User;
