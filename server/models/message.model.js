const { Schema, model } = require("mongoose");

const messageShema = new Schema({
  mainText: {
    type: String,
    require: true,
  },

  creator: [
    {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "chatUser",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model("chatMessage", messageShema);
module.exports.Message = Message;
