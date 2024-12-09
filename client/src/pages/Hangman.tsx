import Hangman from '../components/Hangman/index.tsx';
import { arrayWords } from '../utils/words.ts';
import { useState } from 'react';

const HangmanPage: React.FC = () => {
  const [word, setWord] = useState<string[]>(arrayWords);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to Hangman!</h1>
      
      <Hangman word={word} currentWord={currentWord} guessedLetters={guessedLetters} incorrectGuesses={incorrectGuesses} maxAttempts={10} setWord={setWord} setCurrentWord={setCurrentWord} setGuessedLetters={setGuessedLetters} setIncorrectGuesses={setIncorrectGuesses} />
    </div>
  );
};

export default HangmanPage;
