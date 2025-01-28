const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
