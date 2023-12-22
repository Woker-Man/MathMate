import React, { useState, useEffect } from 'react';
import './styles/MultiRain.css'; // Adjust the file name as needed

function MultiRain() {
  const [score, setScore] = useState(0);
  const [equations, setEquations] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    generateNewEquation();
  }, [score]); // Re-generate equation when the score changes

  const generateNewEquation = () => {
    const newEquation = generateEquation();
    setEquations([newEquation]);
  };

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;

    return {
      equation: `${num1} X ${num2}`,
      answer,
      column: Math.floor(Math.random() * 10),
      row: Math.floor(Math.random() * 10),
    };
  };

  const handleAnswer = () => {
    const currentEquation = equations[0];

    if (parseInt(userAnswer, 10) === currentEquation.answer) {
      setScore(score + 1);
     
    } else {
      setScore(Math.max(score - 1, 0));
    }

    setUserAnswer(''); // Clear the answer after handling it
  };

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
                    <div key={index} className="equation" style={{ animationDelay: `${index * 2}s` }}>
                      {equation.equation}
                    </div>
                  ))}
              </div>
            ))}
            {/* Display row index at the rightmost column */}
            <div className="row-index">{10-rowIndex}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="score">Score: {score}</div>
      <input
        type="number"
        placeholder="Your Answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onBlur={handleAnswer}
      />
    </div>
  );
}

export default MultiRain;
