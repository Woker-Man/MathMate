import React, { useState, useEffect } from 'react';
import './styles/MultiRain.css';

function MultiRain() {
  const [score, setScore] = useState(0);
  const [equations, setEquations] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(null);
  
  useEffect(() => {
    
    const intervalId = setInterval(() => {
      generateNewEquation();
      resetTimer();
    }, 10000);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    const generateNewEquation = () => {
      const newEquation = generateEquation(0); // Always start from row 0
      setEquations([newEquation]);
      startTimer();
    };

    const generateEquation = (fixedRow) => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const answer = num1 * num2;

      return {
        equation: `${num1} X ${num2}`,
        answer,
        column: Math.floor(Math.random() * 10),
        row: fixedRow, // Fixed row to always start from the top
        startTime: Date.now(),
      };
    };

    const startTimer = () => {
      setTimer(setTimeout(() => handleAnswer(), 10000)); // Set a 10-second time limit
    };

    const resetTimer = () => {
      clearTimeout(timer);
      setTimer(null);
    };

    const handleAnswer = () => {
      const currentEquation = equations[0];

      if (parseInt(userAnswer, 10) === currentEquation.answer) {
        const elapsedTime = Date.now() - currentEquation.startTime;
        const maxScore = 10;
        const baseScore = Math.max(maxScore - Math.floor(elapsedTime / 1000), 0);
        setScore(score + baseScore);
      } else {
        setScore(Math.max(score - 5, 0));
      }

      setUserAnswer('');
      generateNewEquation();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(intervalId);
      resetTimer();
    };
  }, [equations, userAnswer, score, timer]);

  return (
    <div className="MultiRain">
      <h1>MultiRain</h1>
      <div className="game-container">
        {[...Array(10)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {[...Array(10)].map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${colIndex === 9 ? 'last-column' : ''}`}
              >
                {equations
                  .filter((equation) => equation.row === rowIndex && equation.column === colIndex)
                  .map((equation, index) => (
                    <div key={index} className="equation">
                      {equation.equation}
                    </div>
                  ))}
              </div>
            ))}
            <div className="row-index">{10 - rowIndex}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="score">Score: {score}</div>
      <input
        type="number"
        placeholder="Your Answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    </div>
  );
}

export default MultiRain;