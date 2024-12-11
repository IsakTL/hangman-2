import Hangman from '../components/Hangman/index.tsx';
import HangmanDrawing from '../components/HangmanDrawing';
// import { arrayWords } from '../utils/words.ts';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_RANDOM_WORD } from '../utils/mutations.ts';


const HangmanPage: React.FC = () => {
  const [getRandomWord] = useMutation(GET_RANDOM_WORD);
  const [word, setWord] = useState<string>('');
  // const [word, setWord] = useState<string[]>(arrayWords);
  // const [currentWord, setCurrentWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = 
  useState<number>(0);
  const fetchRandomWord = async () => {
    try {
      const { data } = await getRandomWord();
      console.log(data);
      setWord(data.getRandomWord.text);
    } catch (err) {
      console.error('Error fetching random word:', err);
    }
  };
  useEffect(()=>{
    fetchRandomWord()
},[])
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to Hangman 2!</h1>
      <HangmanDrawing incorrectGuesses={incorrectGuesses} />
      <Hangman 
      word={word} 
      // currentWord={currentWord} 
      guessedLetters={guessedLetters} 
      incorrectGuesses={incorrectGuesses} 
      maxAttempts={10} 
      // setWord={setWord} 
      // setCurrentWord={setCurrentWord} 
      setGuessedLetters={setGuessedLetters} 
      setIncorrectGuesses={setIncorrectGuesses}
      fetchRandomWord = {fetchRandomWord}
      />
    </div>
  );
};

export default HangmanPage;
