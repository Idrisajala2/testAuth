const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
