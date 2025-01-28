const express = require("express");
const router = express.Router();
const Car = require("../schemas/carSchema");

router.get("/", (req, res) => {
    Car.find()
        .then((tracks) => {
            res.json(tracks);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error retrieving cars" });
        });
});

router.post("/add", async (req, res) => {
    const { name, code } = req.body;
    const newCar = new Car({ name, code });
    try {
        const savedTrack = await newCar.save();
        res.json(savedTrack);
    } catch (error) {
        res.status(500).json({ error: "Error saving car" });
    }
});

module.exports = router;
