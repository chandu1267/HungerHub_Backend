const mongoose = require("mongoose");
const Vendor = require("./Vendor");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [{
        type: String,
        enum: ["veg", "non-veg"],
      }],
  },
  region: {
    type: [{
        type: String,
        enum: ["South-india","North-india","Chinese","Bakery"],
      }],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  Vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  product:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }]
});

const Firm = mongoose.model("Firm", firmSchema);

module.exports = Firm;
