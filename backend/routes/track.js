const express = require("express");
const router = express.Router();
const Track = require("../schemas/trackSchema");

router.get("/", (req, res) => {
    Track.find()
        .then((tracks) => {
            res.json(tracks);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error retrieving tracks" });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Track.findById(id)
        .then((track) => {
            if (!track) {
                res.status(404).json({ error: "Track not found" });
            } else {
                res.json(track);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Error retrieving track" });
        });
});

router.get("/:id/setups", (req, res) => {
    const { id } = req.params;

    Track.findById(id)
        .populate({
            path: "setups",
            populate: {
                path: "carCode",
                select: "name",
            },
        })
        .then((track) => {
            if (!track) {
                res.status(404).json({ error: "Track not found" });
            } else {
                const setupsWithCarName = track.setups.map((setup) => ({
                    ...setup.toObject(),
                    carName: setup.carCode.name,
                }));

                res.json(setupsWithCarName);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Error retrieving setups for track",
            });
        });
});

router.post("/add", async (req, res) => {
    const { name, code } = req.body;
    const newTrack = new Track({ name, code });
    try {
        const savedTrack = await newTrack.save();
        res.json(savedTrack);
    } catch (error) {
        res.status(500).json({ error: "Error saving track" });
    }
});

module.exports = router;
