import React from 'react';

interface HangmanDrawingProps {
  incorrectGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ incorrectGuesses }) => {
  // Define hangman parts to draw in order
  const hangmanParts = [
    <line x1="50" y1="200" x2="150" y2="200" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Base
    <line x1="100" y1="200" x2="100" y2="50" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Vertical pole
    <line x1="100" y1="50" x2="150" y2="50" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Top horizontal pole
    <line x1="150" y1="50" x2="150" y2="70" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Rope
    <circle cx="150" cy="90" r="20" stroke="rgb(108, 247, 83)" strokeWidth="2" fill="none" />, // Head
    <line x1="150" y1="110" x2="150" y2="160" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Body
    <line x1="150" y1="120" x2="130" y2="140" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Left arm
    <line x1="150" y1="120" x2="170" y2="140" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Right arm
    <line x1="150" y1="160" x2="130" y2="190" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Left leg
    <line x1="150" y1="160" x2="170" y2="190" stroke="rgb(108, 247, 83)" strokeWidth="2" />, // Right leg
  ];

  return (
    <svg
      width="200"
      height="250"
      style={{
        border: '1px solid rgb(108, 247, 83)',
        margin: '20px auto',
        display: 'block',
      }}
    >
      {hangmanParts.slice(0, incorrectGuesses)}
    </svg>
  );
};

export default HangmanDrawing;
