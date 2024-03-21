import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
});

const Genre = mongoose.model("genre", genreSchema, "genre");

export default Genre;
