const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    service: {
      type: String,
      enum: ["Hair", "Beard", "Both"],
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    taskStatus: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
