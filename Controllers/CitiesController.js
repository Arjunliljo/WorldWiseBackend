const City = require("../Models/citySchema");

async function getAllcities(req, res) {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCity(req, res) {
  try {
    const city = await City.findById(req.params.cityId);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addCity(req, res) {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCity(req, res) {
  try {
    const city = await City.findByIdAndUpdate(req.params.cityId, req.body, {
      new: true,
    });
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCity(req, res) {
  try {
    const city = await City.findByIdAndDelete(req.params.cityId);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    res.send("deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllcities,
  getCity,
  addCity,
  updateCity,
  deleteCity,
};
