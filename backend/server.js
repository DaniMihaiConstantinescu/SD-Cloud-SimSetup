require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

connectDB();

const setupRouter = require("./routes/setup");
const trackRouter = require("./routes/track");
const carRouter = require("./routes/car");

app.use("/setups", setupRouter);
app.use("/tracks", trackRouter);
app.use("/cars", carRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
