
import React, { useState, useEffect } from 'react';
import './styles/Simple.css';

const SimpleOperation= ({operator}) => {
  const [operationNameNoun,setOperationNameNoun] = useState("Operation")
  const [operationNameVerb,setOperationNameVerb] = useState("Operate")
  const [operationSymbol,setOperationSymbol] = useState(".")
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(0);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(5);
  const [numLeft,setNumLeft] =  useState(0);
  const [numRight,setNumRight] = useState(0);
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
  const containerStyle = {
    backgroundImage: 'url("https://wallpaperset.com/w/full/2/3/4/323175.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Set the height as needed
    // Add other styles as needed
  };
  useEffect(() => {
    const savedHighScore = parseInt(sessionStorage.getItem('highScore'), 10) || 0;
    setHighScore(savedHighScore);

    // Add event listener to handle page refresh or closure
    const handlePageUnload = () => {
      // Reset the high score to zero
      setHighScore(0);
      sessionStorage.setItem('highScore', '0');
    };

    window.addEventListener('beforeunload', handlePageUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, []);

  useEffect(() => {
    console.log(isCorrect);
  }, [isCorrect]);

  useEffect(() => {
    sessionStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  const generateRandomNumbers = () => {
    const newRangeStart = rangeEnd + 1;
    const newRangeEnd = newRangeStart + 4;
    setRangeStart(newRangeStart);
    setRangeEnd(newRangeEnd);

    // const uniqueOptions = [];
    // while (uniqueOptions.length < 3) {
    //   const randomNum = Math.floor(Math.random() * 10) + newRangeStart;
    //   if (!uniqueOptions.includes(randomNum)) {
    //     uniqueOptions.push(randomNum);
    //   }
    // }

    const newNum1 = Math.floor(Math.random() * 5) + newRangeStart;
    const newNum2 = Math.floor(Math.random() * 5) + newRangeStart;

    let correctAnswer,a,b,c,allOptions
    switch(operator) {
    case "+":
    correctAnswer = newNum1 + newNum2;
    a=correctAnswer-1;
    b=correctAnswer-2;
    c=correctAnswer+1;
    allOptions = [a,b,c,correctAnswer].sort(() => Math.random() - 0.5);
    setNumLeft(newNum1);
    setNumRight(newNum2);

    break;
    case "-":
    correctAnswer = newNum1 + newNum2;
    a=newNum1-1;
    b=newNum1-2;
    c=newNum1+1;
    allOptions = [a,b,c,newNum1].sort(() => Math.random() - 0.5);
    setNumLeft(newNum1+newNum2);
    setNumRight(newNum2);
    break;
    case "*":
    correctAnswer = newNum1 * newNum2;
    a=correctAnswer-1;
    b=correctAnswer-2;
    c=correctAnswer+1;
    allOptions = [a,b,c,correctAnswer].sort(() => Math.random() - 0.5);
    setNumLeft(newNum1);
    setNumRight(newNum2);

    
    break;
    case "/":
    correctAnswer = newNum1 / newNum2;
    a=newNum1-1;
    b=newNum1-2;
    c=newNum1+1;
    allOptions = [a,b,c,newNum1].sort(() => Math.random() - 0.5);
    setNumLeft(newNum1*newNum2);
    setNumRight(newNum2);
    break;
    default:
	console.log("Unknown Operator")
    }
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsCorrect(null);
    setOptions(allOptions);
  };

  const checkAnswer = (selectedOption) => {
   let correctAnswer,userEnteredAnswer
   
   switch(operator){
   case "+":
    correctAnswer = num1 + num2;
    userEnteredAnswer = parseInt(selectedOption, 10);
   break;
   case "-":
    correctAnswer = (num1+num2) - num2;
    userEnteredAnswer = parseInt(selectedOption, 10);
   break;
   case "*":
    correctAnswer = num1 * num2;
    userEnteredAnswer = parseInt(selectedOption, 10);
   break;
   case "/":
    correctAnswer = num1;
    userEnteredAnswer = parseInt(selectedOption, 10);
    break;
    default:
    console.log("Unknown operator")
    }

    console.log(num1,num2,correctAnswer)
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
    switch(operator){
	case "+":
	setOperationNameNoun("Addition")
	setOperationNameVerb("Add")
	setOperationSymbol("+")
	break;
	case "-":
	setOperationNameNoun("Subtraction")
	setOperationNameVerb("Subtract")
	setOperationSymbol("-")
	break;
	case "*":
	setOperationNameNoun("Multiplication")
	setOperationNameVerb("Multiply")
	setOperationSymbol("X")
	break;
	case "/":
	setOperationNameNoun("Division")
	setOperationNameVerb("Divide")
	setOperationSymbol("÷")
	break;
	default:
	console.log("Unknown Operator")
    }
  }, []);

  return (
    <div id="simple_addition" className="container-style cool-style" style={containerStyle}>
      <h2 className='score1'>Normal Score: {normalScore}</h2> <h2 className='score1'>High Score: {highScore}</h2>
      <h1 className="font-style">Simple {operationNameNoun}</h1>
      <center>
        <h2 className='type'>{operationNameVerb} the following numbers:</h2>
      </center>
      <div className={`container ${animateWrong ? 'wrong-answer-animation' : ''} ${animateCorrect ? 'correct-answer-animation' : ''}`}>
        <h1 className="font-style">
          {numLeft} <span>{operationSymbol}</span> {numRight} ={' '}
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

export default SimpleOperation;
