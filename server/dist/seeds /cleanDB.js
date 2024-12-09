import mongoose from "mongoose";
import { User, Game, Word } from "../models";
const cleanDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yourdb");
        console.log("Clearing database...");
        await User.deleteMany({});
        await Game.deleteMany({});
        await Word.deleteMany({});
        console.log("Database cleared!");
        process.exit(0);
    }
    catch (err) {
        console.error("Error while clearing database:", err);
        process.exit(1);
    }
};
cleanDB();
