const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        setups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Setup",
            },
        ],
    },
    { timestamps: true }
);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
