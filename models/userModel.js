const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountType: {
    type: mongoose.Schema.Types.String,
    ref: "accountType",
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
