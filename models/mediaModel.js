const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  url: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  genre_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

const Media = mongoose.model("media", mediaSchema, "media");

module.exports = Media;
