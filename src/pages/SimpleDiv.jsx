// Inside SimpleAdd.js

import  { useState, useEffect } from 'react';
import './styles/Simple.css';
import appleImage from '/images/apple.png';
import orangeImage from '/images/orange.png';
import bananaImage from '/images/banana.png';
import mangoImage from '/images/grape.png';
import PropTypes from 'prop-types';
const fruitImages = [appleImage, orangeImage, bananaImage, mangoImage];
const totalFruits = fruitImages.length;

const SimpleDiv= ({ isBackgroundColorChanged}) => {
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
  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const [options, setOptions] = useState([]);
  const [animateWrong, setAnimateWrong] = useState(false);
  const [animateCorrect, setAnimateCorrect] = useState(false);
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [language, setLanguage] = useState('english'); // Initial language
  const languages = {
    english: {
      heading: 'Simple Division',
      sub:'Divide the following numbers',
      highScoreText: 'High Score',
      scoreText: 'Score',
      lang:'Language',
      // Add more language-specific content as needed
    },
    hindi: {
      heading: 'सरल भाग',
      sub:'निम्नलिखित संख्याओं को विभाजित करें',
      highScoreText: 'उच्च स्कोर',
      scoreText: 'स्कोर',
      lang:'भाषा',
      // Add more language-specific content as needed
    },
    bengali: {
      heading: 'সহজ ভাগ',
      sub:'নিম্নলিখিত সংখ্যাগুলি ভাগ করুন',
      highScoreText: 'উচ্চ স্কোর',
      scoreText: 'স্কোর',
      lang:'ভাষা',
    }
    // Add more languages as needed
  };
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
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
    stopSpeaking();
    const newRangeStart = rangeEnd + 1;
    const newRangeEnd = newRangeStart + 4;
    setRangeEnd(newRangeEnd);

    // const uniqueOptions = [];
    // while (uniqueOptions.length < 3) {
    //   const randomNum = Math.floor(Math.random() * 10) + newRangeStart;
    //   if (!uniqueOptions.includes(randomNum)) {
    //     uniqueOptions.push(randomNum);
    //   }
    // }

    const newNum1 = Math.floor(Math.random() * 10) + 1
    const newNum2 = Math.floor(Math.random() * 10) + 1
    const a=newNum1-1;
    const b=newNum1-2;
    const c=newNum1+1;
    const allOptions = [a,b,c,newNum1].sort(() => Math.random() - 0.5);

    setNum1(newNum1);
    setNum2(newNum2);
    speak(newNum1*newNum2+"divided by"+newNum2);
    setUserAnswer('');
    setIsCorrect(null);
    setOptions(allOptions);
  };

  
  useEffect(() => {
    setCurrentFruitIndex(prevIndex => (prevIndex +1) % totalFruits);
  }, [num1, num2]);

  const generateFruit = () => {
    const fruitRows = [];
    for (let i = 0; i < num2; i++) {
      const fruits = [];
      for (let j = 0; j < num1; j++) {
        fruits.push(<img key={j} src={fruitImages[(currentFruitIndex) % totalFruits]} alt="fruit" className="apple" />);
      }
      fruitRows.push(
        <div key={i} className="box" style={{ border: '2px solid black', borderRadius: '10px', padding: '10px', margin: '5px', display: 'flex', justifyContent: 'center' }}>
          {fruits}
        </div>
      );
    }
    return fruitRows;
  };

  const checkAnswer = (selectedOption) => {
    const userEnteredAnswer = parseInt(selectedOption, 10);

    const newIsCorrect = userEnteredAnswer === num1;

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
  const languageContent = languages[language];
  return (
    <div id="simple_addition" className={`container-style ${isBackgroundColorChanged ? 'background-changed' : ''} ${isBackgroundColorChanged ? 'cool-style-disabled' : 'cool-style'}`} style={isBackgroundColorChanged ? null : containerStyle}>
       <div className="dropdown settings4">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         {languageContent.lang}
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => handleLanguageChange('english')}>English</button></li>
          <li><button className="dropdown-item" onClick={() => handleLanguageChange('hindi')}>Hindi</button></li>
          <li><button className="dropdown-item" onClick={() => handleLanguageChange('bengali')}>Bengali</button></li>
        </ul>
        </div>
      <h2 className='score1'>{languageContent.scoreText}: {normalScore}</h2> <h2 className='score1'>{languageContent.highScoreText}: {highScore}</h2>
      <h1 id="text1" className="font-style">{languageContent.heading}</h1>
      <center>
        <h2 id="text2" className='type'>{languageContent.sub}:</h2>
      </center>
      <div className="apple-container" style={{ width: '100%' }}>
        <div className="box-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {generateFruit(num1)}
        </div>
      </div>
      <div className={`container ${animateWrong ? 'wrong-answer-animation' : ''} ${animateCorrect ? 'correct-answer-animation' : ''}`}>
        <h1 id="text3" className="font-style">
          {num1*num2} <span>÷</span> {num2} ={' '}
          {options.map((option, index) => (
            <button 
              key={index}
              onClick={() => {
                setUserAnswer(option);
                checkAnswer(option);
              }}
              className={`cool-container-button ${userAnswer === option && isCorrect ? 'correct' : ''} ${userAnswer === option && !isCorrect ? 'incorrect' : ''}`}
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
SimpleDiv.propTypes = {
  isBackgroundColorChanged: PropTypes.bool.isRequired,
  handleBackgroundColorChange: PropTypes.func.isRequired
};
export default SimpleDiv;
