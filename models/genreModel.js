const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
