const mongoose = require("mongoose");

const setupSchema = new mongoose.Schema(
    {
        carCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            required: true,
        },
        tirePressures: {
            fl: { type: Number, required: true },
            fr: { type: Number, required: true },
            rl: { type: Number, required: true },
            rr: { type: Number, required: true },
        },
        aero: {
            frontWing: { type: Number, required: true },
            rearWing: { type: Number, required: true },
        },
        brakeBias: { type: Number, required: true },
        diffPower: { type: Number, required: true },
        diffCoast: { type: Number, required: true },
        camber: {
            fl: { type: Number, required: true },
            fr: { type: Number, required: true },
            rl: { type: Number, required: true },
            rr: { type: Number, required: true },
        },
        toe: {
            fl: { type: Number, required: true },
            fr: { type: Number, required: true },
            rl: { type: Number, required: true },
            rr: { type: Number, required: true },
        },
        setupType: {
            type: String,
            enum: ["race", "qualy"],
            required: true,
        },
    },
    { timestamps: true }
);

const Setup = mongoose.model("Setup", setupSchema);

module.exports = Setup;
