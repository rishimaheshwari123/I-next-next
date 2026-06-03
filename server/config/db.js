const mongoose = require("mongoose")
const migrateCategories = require("../utils/categoryMigration");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connection successfully!")
        await migrateCategories();
    } catch (error) {
        console.log(error)
        console.log("connection faild!")

    }
}
module.exports = connectDB;
