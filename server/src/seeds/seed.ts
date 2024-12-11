import mongoose from "mongoose";
import { User, Game, Word } from "../models/index.js";
import wordData from './wordSeeds.json' with { type: 'json' };

const cleanDB = async () => {
  try {
    console.log("Clearing database...");
    await User.deleteMany({});
    await Game.deleteMany({});
    await Word.deleteMany({});
    console.log("Database cleared!");
  } catch (err) {
    console.error("Error while clearing database:", err);
    throw err; // Propagate the error to handle it in the caller
  }
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yourdb");

    console.log("Cleaning and seeding database...");
    await cleanDB(); // Call the cleanDB function

    // Users
    const users = await User.insertMany([
      { username: "player1", email: "player1@example.com", password: "password123" },
      { username: "player2", email: "player2@example.com", password: "password123" },
    ]);
    console.log("Users seeded:", users);

    // Words
    const words = await Word.insertMany([
      ...wordData.words,
    ]);
    console.log("Words seeded:", words);

    // Games
    const games = await Game.insertMany([
      {
        userId: users[0]._id,
        wordId: words[0]._id,
        maskedWord: "__________",
        solution: "javascript",
        guesses: [],
        numBadGuesses: 0,
        isComplete: false,
        isWinner: false,
      },
    ]);
    console.log("Games seeded:", games);

    console.log("Database seeded!");
    process.exit(0);
  } catch (err) {
    console.error("Error while seeding database:", err);
    process.exit(1);
  }
};

seed();
