const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tmohamedibahim1011_db_user:JQTFmDzp1xIej71e@cluster0.g05az4o.mongodb.net/?appName=Cluster0');
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;