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
  profilePic: {
    type: String,
  },
  Message: [
    {
      type: Schema.Types.ObjectId,
      ref: "chatMessage",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("chatUser", userShema);
module.exports.User = User;
