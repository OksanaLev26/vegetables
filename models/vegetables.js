const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Vegetable name is required"] },
  color: { type: String, required: true },
  readyToEat: { type: Boolean },
});

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

module.exports = Vegetable;