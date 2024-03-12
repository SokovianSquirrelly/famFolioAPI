const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountTypeId: {
    type: Schema.Types.ObjectId,
    ref: "accountType",
    required: true,
  },
});

const User = mongoose.model("user", userSchema, "user");

module.exports = User;
