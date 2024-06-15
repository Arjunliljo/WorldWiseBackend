const express = require("express");
const {
  getAllcities,
  getCity,
  addCity,
  updateCity,
  deleteCity,
} = require("../Controllers/CitiesController");
const router = express.Router();

router.get("/", getAllcities); // Get all cities
router.get("/:cityId", getCity); // Get a specific city by ID
router.post("/", addCity); // Add a new city
router.patch("/:cityId", updateCity); // Update a specific city by ID
router.delete("/:cityId", deleteCity); // Delete a specific city by ID

module.exports = router;
