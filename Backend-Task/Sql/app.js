const express = require("express");
const OrderRoutes = require("./Routes/OrderRoutes");
const db = require("./db");

const app = express();

app.use(express.json());


app.use("/orders", OrderRoutes);
app.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});
app.listen(5001, () => {
    console.log("Server running on port 5001");
});