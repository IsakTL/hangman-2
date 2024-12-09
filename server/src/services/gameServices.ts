import type { Response } from 'express';
import type { IGame } from '../models/Game.js';

// Set maximum allowed bad guesses
const MAX_BAD_GUESSES = 9;

const maskLettersInWord = (word: string) => {
  return word.replace(/[A-Za-z]/g, '_');
};

const guessLetter = (letter: string, game: IGame) => {
  // Add the new guess
  const newGuessLetter = letter.toLowerCase();
  game.guesses.push(newGuessLetter);

  // Check if the new guess is correct
  const isCorrect = game.solution.toLowerCase().includes(newGuessLetter);

  // Update the masked word
  const updatedMaskedWord = updateMaskedWord(game.solution, game.guesses);

  game.maskedWord = updatedMaskedWord;

  // Handle bad guesses
  if (!isCorrect) {
    game.numBadGuesses++;
  }

  if (!isCorrect && game.numBadGuesses >= MAX_BAD_GUESSES) {
    // End game if we are out of bad guesses
    game.isComplete = true;
    game.isWinner = false;
    console.log('game.isComplete', game.isComplete);
  }

  return { game, isCorrect };
};

const updateMaskedWord = (word: string, guesses: string[]) => {
  let maskedWord = '';
  for (let i = 0; i < word.length; i++) {
    const currentChar = word[i];
    if (/[A-Za-z]/.test(currentChar)) {
      if (guesses.includes(currentChar.toLowerCase())) {
        maskedWord += currentChar;
      } else {
        maskedWord += '_';
      }
    } else {
      maskedWord += currentChar;
    }
  }
  return maskedWord;
};

const saveAndReturnGame = async (
  game: IGame,
  isCorrect: boolean,
  res: Response
) => {
  await game.save();

  return res.json({
    id: game._id,
    maskedWord: game.maskedWord,
    solution: game.solution,
    guesses: game.guesses,
    isCorrect,
    isComplete: game.isComplete,
    isWinner: game.isWinner,
    guessesRemaining: MAX_BAD_GUESSES - game.numBadGuesses,
  });
};

const handleWin = async (game: IGame, res: Response) => {
  game.isComplete = true;
  game.isWinner = true;
  game.maskedWord = game.solution;
  await saveAndReturnGame(game, true, res);
};

export { maskLettersInWord, guessLetter, saveAndReturnGame, handleWin };
