import React, { useState, useEffect } from 'react';
import './styles/MultiRain.css';

function MultiRain() {
  const [score, setScore] = useState(0);
  const [equations, setEquations] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newEquation = generateEquation();
      setEquations((prevEquations) => [...prevEquations, newEquation]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;

    return {
      equation: `${num1} X ${num2}`,
      answer,
    };
  };

  const handleAnswer = (userAnswer, index) => {
    const currentEquation = equations[index];

    if (userAnswer === currentEquation.answer) {
      setScore(score + 1);
    } else {
      setScore(Math.max(score - 1, 0));
    }

    const newEquations = [...equations];
    newEquations.splice(index, 1, generateEquation());
    setEquations(newEquations);
  };

  return (
    <div className="MultiRain">
      <h1>MultiRain</h1>
      <div className="game-container">
        {equations.map((equation, index) => (
          <div key={index} className="equation" style={{ animationDelay: `${index * 2}s` }}>
            {equation.equation}
            <input
              type="number"
              placeholder="Your Answer"
              onChange={(e) => handleAnswer(parseInt(e.target.value, 10), index)}
            />
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default MultiRain;
