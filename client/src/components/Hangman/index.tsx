import { Dispatch, SetStateAction } from 'react';

interface GameProps {
  word: string,
  guessedLetters: string[],
  incorrectGuesses: number,
  maxAttempts: number,
  setGuessedLetters: Dispatch<SetStateAction<string[]>>,
  setIncorrectGuesses: Dispatch<SetStateAction<number>>,
  fetchRandomWord: Dispatch<SetStateAction<void>>,
}

const Hangman = ({
  word, 
  guessedLetters, 
  incorrectGuesses, 
  maxAttempts, 
  setGuessedLetters, 
  setIncorrectGuesses,
  fetchRandomWord
}: GameProps) => {

  const getWordDisplay = () => {
  // console.log("currentword: ",word)
    return word
      .split('')
      .map((letter) => (guessedLetters.includes(letter.toUpperCase()) ? letter : '_'))
      .join(' ');
  }
    
  const isGameOver = () =>
    incorrectGuesses >= maxAttempts || getWordDisplay().indexOf('_') === -1;

  const handleGuess = (letter: string) => {
    if (isGameOver() || guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
    if (!word.toUpperCase().includes(letter)) setIncorrectGuesses((prev) => prev + 1);
  };

  const resetGame = async () => {
    await fetchRandomWord()
    setGuessedLetters([]);
    setIncorrectGuesses(0);
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
