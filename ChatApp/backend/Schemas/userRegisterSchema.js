const mongoose = require("mongoose");

const userRegisterSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/icon/icon-avatar-9.html.html>Icon Avatar # 403523",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userRegisterSchema);

module.exports = User;
