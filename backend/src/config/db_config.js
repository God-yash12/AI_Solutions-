const mongoose = require('mongoose');
require('dotenv').config();

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            
        });
        console.log("Database connected...");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

module.exports = DBConnection;
