const express = require("express");
const router = express.Router();
const Setup = require("../schemas/setupSchema");
const Track = require("../schemas/trackSchema");

router.get("/", (req, res) => {
    res.send("Setup Page");
});

router.post("/add", async (req, res) => {
    const {
        trackId,
        carCode,
        tirePressures,
        aero,
        brakeBias,
        diffPower,
        diffCoast,
        camber,
        toe,
        setupType,
    } = req.body;

    const newSetup = new Setup({
        carCode,
        tirePressures,
        aero,
        brakeBias,
        diffPower,
        diffCoast,
        camber,
        toe,
        setupType,
    });

    try {
        const savedSetup = await newSetup.save();
        const track = await Track.findById(trackId);
        if (!track) {
            return res.status(404).send("Track not found");
        }

        track.setups.push(savedSetup._id);
        await track.save();
        res.send("Setup added successfully and linked to track");
    } catch (error) {
        console.error("Error saving setup or linking to track:", error);
        res.status(500).send("Error saving setup or linking to track");
    }
});

module.exports = router;
