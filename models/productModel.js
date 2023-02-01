const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "",
  },
  name: String,
  description: String,
  price: String,
  img: String,
});

module.exports = model("Product", productSchema);
