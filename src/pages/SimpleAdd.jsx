import React, { useState, useEffect } from 'react';
import './styles/Simple.css';
import appleImage from '/images/apple.png';
import orangeImage from '/images/orange.png';
import bananaImage from '/images/banana.png';
import mangoImage from '/images/grape.png';

const fruitImages = [appleImage, orangeImage, bananaImage, mangoImage];
const totalFruits = fruitImages.length;

const SimpleAdd = ({ isBackgroundColorChanged, handleBackgroundColorChange }) => {
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(0);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(5);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [normalScore, setNormalScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = parseInt(sessionStorage.getItem('highScore'), 10) || 0;
    return savedHighScore;
  });
  const [options, setOptions] = useState([]);
  const [animateWrong, setAnimateWrong] = useState(false);
  const [animateCorrect, setAnimateCorrect] = useState(false);
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);

  useEffect(() => {
    const savedHighScore = parseInt(sessionStorage.getItem('highScore'), 10) || 0;
    setHighScore(savedHighScore);

    const handlePageUnload = () => {
      setHighScore(0);
      sessionStorage.setItem('highScore', '0');
    };

    window.addEventListener('beforeunload', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  const generateRandomNumbers = () => {
    const newRangeStart = rangeEnd + 1;
    const newRangeEnd = newRangeStart + 4;
    setRangeStart(newRangeStart);
    setRangeEnd(newRangeEnd);

    const newNum1 = Math.floor(Math.random() * 30) + 1
    const newNum2 = Math.floor(Math.random() * 30) + 1
    const correctAnswer = newNum1 + newNum2;
    const a=correctAnswer-1;
    const b=correctAnswer-2;
    const c=correctAnswer+1;
    const allOptions = [a,b,c,correctAnswer].sort(() => Math.random() - 0.5);

    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsCorrect(null);
    setOptions(allOptions);
  };

  useEffect(() => {
    setCurrentFruitIndex(prevIndex => (prevIndex +1) % totalFruits);
  }, [num1, num2]);

  const generateFruit = (count) => {
    const fruits = [];
    for (let i = 0; i < count; i++) {
      fruits.push(<img key={i} src={fruitImages[(currentFruitIndex ) % totalFruits]} alt="fruit" className="apple"/>);
    }
    return fruits;
  };

  const checkAnswer = (selectedOption) => {
    const correctAnswer = num1 + num2;
    const userEnteredAnswer = parseInt(selectedOption, 10);

    const newIsCorrect = userEnteredAnswer === correctAnswer;

    setIsCorrect(newIsCorrect);

    if (newIsCorrect) {
      setAnimateCorrect(true);

      setTimeout(() => {
        setAnimateCorrect(false);
        generateRandomNumbers();
        setNormalScore((prevScore) => prevScore + 1);
      }, 500);

    } else {
      if (normalScore > highScore) {
        setHighScore(normalScore);
      }
      setNormalScore(0);

      setAnimateWrong(true);

      setTimeout(() => {
        setAnimateWrong(false);
        generateRandomNumbers();
      }, 1000);
    }
    
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <div id="simple_addition" className={`container-style ${isBackgroundColorChanged ? 'background-changed' : ''} ${isBackgroundColorChanged ? 'cool-style-disabled' : 'cool-style'}`}>
      <h2 className='score1'>Normal Score: {normalScore}</h2> <h2 className='score1'>High Score: {highScore}</h2>
      <h1 id="text1" className="font-style">Simple Add</h1>
      <center>
        <h2 id="text2" className='type'>Add the following numbers:</h2>
      </center>
      <div className="apple-container">
        <div className="box">
          {generateFruit(num1)}
        </div>
        <div className="plus-sign">+</div>
        <div className="box">
          {generateFruit(num2)}
        </div>
      </div>
      <div className={`container ${animateWrong ? 'wrong-answer-animation' : ''} ${animateCorrect ? 'correct-answer-animation' : ''}`}>
        <h1 id="text3" className="font-style">
          {num1} <span>+</span> {num2} ={' '}
          {options.map((option, index) => (
            <button 
              key={index}
              onClick={() => {
                setUserAnswer(option);
                checkAnswer(option);
              }}
              className={`cool-container-button ${userAnswer === option && isCorrect ? 'correct' : ''} ${
                userAnswer === option && !isCorrect ? 'incorrect' : ''
              }`}
              disabled={userAnswer !== ''}
            >
              {option}
            </button>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default SimpleAdd;
