// const vegetables = [
//     {
//       name: "tomato",
//       color: "red",
//       readyToEat: true,
//     },
//     {
//       name: "pepper",
//       color: "yellow",
//       readyToEat: false,
//     },
//     {
//       name: "carrot",
//       color: "orange",
//       readyToEat: true,
//     },
//     {
//       name: "zucchini",
//       color: "green",
//       readyToEat: false,
//     },
//     {
//       name: "cabbage",
//       color: "green",
//       readyToEat: true,
//     },
//   ];

//   module.exports = vegetables;

const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Vegetable name is required"] },
  color: { type: String, required: true },
  readyToEat: { type: Boolean },
});

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

module.exports = Vegetable;