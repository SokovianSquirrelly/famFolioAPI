const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Category = mongoose.model("category", categorySchema, "category");

module.exports = Category;
