const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;