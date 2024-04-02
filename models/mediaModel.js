import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  url: { type: String, required: true },
  description: { type: String },
  date_created: { type: Date, default: Date.now }, // changed from created_at
  time_created: { type: String, default: () => new Date().toTimeString() }, // new field
  date_updated: { type: Date, default: Date.now }, // changed from updated_at
  time_updated: { type: String, default: () => new Date().toTimeString() }, // new field
  genre_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "genre" }],
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Media = mongoose.model("media", mediaSchema, "media");

export default Media;
