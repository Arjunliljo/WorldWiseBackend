const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: String,
  country: String,
  date: String,
  notes: String,
  position: {
    lat: String,
    lng: String,
  }
});

const City = mongoose.model("City", citySchema);

module.exports = City;
