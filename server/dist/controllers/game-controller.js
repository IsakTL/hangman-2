import { Game, User } from "../models/index.js";
const gameController = {
    startGame: async (userId) => {
        const user = await User.findById(userId);
        if (!user)
            throw new Error("User not found");
        const word = "example"; // Replace with actual logic to fetch a random word
        const maskedWord = word.replace(/./g, "_");
        const game = new Game({
            userId,
            word,
            maskedWord,
            guesses: [],
            numBadGuesses: 0,
            isComplete: false,
            isWinner: false,
        });
        await game.save();
        return game;
    },
    guessWord: async (gameId, letter) => {
        const game = await Game.findById(gameId);
        if (!game)
            throw new Error("Game not found");
        if (game.isComplete)
            throw new Error("Game is already complete");
        // Update game logic with guessed letter
        game.guesses.push(letter);
        await game.save();
        return game;
    },
    endGame: async (gameId) => {
        const game = await Game.findById(gameId);
        if (!game)
            throw new Error("Game not found");
        game.isComplete = true;
        await game.save();
        return game;
    },
};
export default gameController;
