const express = require("express");
const connectDB = require("./db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/orders", orderRoutes);

app.listen(5001, () => {
    console.log("Server running on port 5001");
});