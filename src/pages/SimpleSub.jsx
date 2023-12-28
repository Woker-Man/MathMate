import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SimpleSub = () => {
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(0);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(5);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [normalScore, setNormalScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    // Retrieve high score from sessionStorage on component mount
    return parseInt(sessionStorage.getItem('highScore'), 10) || 0;
  });
  const [showModal, setShowModal] = useState(false);

  const generateRandomNumbers = () => {
    const newRangeStart = rangeEnd + 1;
    const newRangeEnd = newRangeStart + 4;
    setRangeStart(newRangeStart);
    setRangeEnd(newRangeEnd);

    const randomNum1 = Math.floor(Math.random() * 5) + newRangeStart;
    const randomNum2 = Math.floor(Math.random() * 5) + newRangeStart;
    setNum1(randomNum1);
    setNum2(randomNum2);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    const userEnteredAnswer = parseInt(userAnswer, 10);

    setIsCorrect((prevIsCorrect) => {
      const newIsCorrect = userEnteredAnswer === num1;

      if (newIsCorrect) {
        generateRandomNumbers();
        setNormalScore((prevScore) => prevScore + 1);
      } else {
        if (normalScore > highScore) {
          setHighScore(normalScore);
          // Save the new high score to sessionStorage
          sessionStorage.setItem('highScore', normalScore.toString());
        }
        setNormalScore(0);
        setShowModal(true);
        setUserAnswer('');
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      }

      

      return newIsCorrect;
    });
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    // Do something when isCorrect changes
    console.log(isCorrect);
  }, [isCorrect]);

  return (
    <div id="simple_addition">
      <h2>Normal Score: {normalScore}</h2> <h2>High Score: {highScore}</h2>
      <h1>Simple Add</h1>
      <center>
        <h2>Add the following numbers:</h2>
      </center>
      <div className="container">
        <h1>
          {num1+num2} <span>-</span> {num2} ={' '}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </h1>
        <button onClick={checkAnswer}>Submit</button>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {console.log('Is Correct:', isCorrect)}
            {isCorrect === true ? 'Correct Answer!' : 'Oops! Wrong Answer, Try Again.'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{isCorrect ? 'Well done!' : "Don't worry, try again."}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SimpleSub;
