require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

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
