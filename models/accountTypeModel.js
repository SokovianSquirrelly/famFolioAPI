const mongoose = require("mongoose");

const accountTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  permissions: { type: [String], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

const AccountType = mongoose.model(
  "accountType",
  accountTypeSchema,
  "accountType"
);

module.exports = AccountType;
