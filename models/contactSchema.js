const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  callSign: { type: String, required: true },
  name: { type: String, required: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  frequency: { type: Number, required: true },
  mode: { type: String, required: true },
  rstSent: { type: String, required: true },
  rstReceived: { type: String, required: true },
  gridSquare: { type: String, required: true },
  notes: { type: String, required: false },
});

module.exports = mongoose.model("ContactSchema", contactSchema, "contacts");
