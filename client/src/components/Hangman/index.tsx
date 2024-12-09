import { Dispatch, SetStateAction, useEffect } from 'react';

interface GameProps {
  word: string[],
  currentWord: string,
  guessedLetters: string[],
  incorrectGuesses: number,
  maxAttempts: number,
  setWord: Dispatch<SetStateAction<string[]>>,
  setCurrentWord: Dispatch<SetStateAction<string>>,
  setGuessedLetters: Dispatch<SetStateAction<string[]>>,
  setIncorrectGuesses: Dispatch<SetStateAction<number>>,
}

const Hangman = ({word, currentWord, guessedLetters, incorrectGuesses, maxAttempts, setWord, setCurrentWord, setGuessedLetters, setIncorrectGuesses}: GameProps) => {
  useEffect(() => {
    randomPoint()
  }, [])

  const randomPoint = () => {
    let randomPoint = Math.floor(Math.random() * word.length);
    setCurrentWord(word[randomPoint])
  }

  const getWordDisplay = () => {

    return currentWord
      .split('')
      .map((letter) => (guessedLetters.includes(letter.toUpperCase()) ? letter : '_'))
      .join(' ');
  }
  const isGameOver = () =>
    incorrectGuesses >= maxAttempts || getWordDisplay().indexOf('_') === -1;

  const handleGuess = (letter: string) => {
    if (isGameOver() || guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
    if (!currentWord.toUpperCase().includes(letter)) setIncorrectGuesses((prev) => prev + 1);
  };

  const resetGame = () => {
    setWord(word);
    setCurrentWord('')
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    randomPoint();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{getWordDisplay()}</h2>
      <div>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isGameOver()}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: guessedLetters.includes(letter) ? '#ddd' : '#fff',
              cursor: guessedLetters.includes(letter) ? 'not-allowed' : 'pointer',
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <p>Incorrect Guesses: {incorrectGuesses} / {maxAttempts}</p>
      {isGameOver() && (
        <h3>{getWordDisplay().indexOf('_') === -1 ? 'You Win! 🎉' : 'Game Over! 😞'}</h3>
      )}
      {isGameOver() && (
        <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px' }}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default Hangman;
