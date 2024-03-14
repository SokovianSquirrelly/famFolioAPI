const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountType",
    required: true,
  },
});
