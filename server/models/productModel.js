const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: String,
    },
    price: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("items", productSchema);
