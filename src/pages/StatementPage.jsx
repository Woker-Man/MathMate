import React, { useState } from 'react';
import './styles/Statement.css';
// import { addition as additionArray, subtraction as subtractionArray, multiplication as multiplicationArray, division as divisionArray } from './ProblemStatements';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const StatementPage= ({ isBackgroundColorChanged, handleBackgroundColorChange }) =>{
  // Addition array
const additionArray = [
  "Maria bought ___ baskets of strawberries and ___ crates of oranges. How many fruits did Maria buy in total?",
  "A farmer has ___ apple trees and ___ pear trees in his orchard. How many fruits does the farmer harvest in total?",
  "Sara has ___ watermelons, and each watermelon weighs ___ kilograms. How many kilograms of fruit does Sara have in total?",
  "At a fruit stand, ___ customers bought ___ dozen bananas each. How many fruits were sold in total?",
  "In a fruit basket, there are ___ apples and ___ oranges. What is the total number of fruits?"
];

// Subtraction array
const subtractionArray = [
  "Tom had ___ toys, and he gave away ___ toys. How many toys does he have left?",
  "There were ___ birds on the tree. ___ birds flew away. How many birds are still there?",
  "John had ___ candies, but he ate ___ candies. How many candies does he have left?",
  "Sally had ___ cookies, but she shared ___ cookies. How many cookies does she have left?",
  "There were ___ students in the class, but ___ students left. How many students are still in the class?"
];

// Multiplication array
const multiplicationArray = [
  "There are ___ boxes, and each box contains ___ pens. How many pens are there in total?",
  "A farmer has ___ baskets. Each basket contains ___ apples. How many apples does the farmer have?",
  "A store has ___ shelves. Each shelf contains ___ books. How many books are there in total?",
  "There are ___ teams in a tournament, and each team has ___ players. How many players are there in total?",
  "There are ___ bags, and each bag contains ___ marbles. How many marbles are there in total?"
];

// Division array
const divisionArray = [
  "There are ___ cookies, and they are divided equally among ___ children. How many cookies does each child get?",
  "There are ___ chocolates, and they are shared equally among ___ friends. How many chocolates does each friend get?",
  "There are ___ candies, and each child receives ___ candies. How many children are there?",
  "There are ___ students, and they are divided into groups with ___ students in each group. How many groups are there?",
  "There are ___ apples, and they are arranged in baskets with ___ apples in each basket. How many baskets are there?"
];

  const [displayedStatement, setDisplayedStatement] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [correctResult, setCorrectResult] = useState(null);

  const containerStyle = {
    backgroundImage: 'url("https://webstockreview.net/images/morning-clipart-sunny-landscape-4.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Set the height as needed
    // Add other styles as needed
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (parseInt(userAnswer, 10) === correctResult) {
      setFeedbackMessage('Correct! Moving to the next question.');
      setTimeout(() => {
        start();
      }, 1000); // Move to the next question after 1 second
    } else {
      setFeedbackMessage('Incorrect! Try again.');
    }
  }
  

  // Function to randomly call any function and display a statement
  function start() {
    const functions = [addition, subtraction, multiplication, division];
    const randomFunction = functions[Math.floor(Math.random() * functions.length)];
    const { statement, result } = randomFunction();
    setDisplayedStatement(statement);
    setUserAnswer('');
    setFeedbackMessage('');
    setCorrectResult(result);
  }

  // Addition function
  function addition() {
    const index = getRandomNumber(0, additionArray.length);
    const statement = additionArray[index];
    const num1 = getRandomNumber(1, 11); // Adjust the range as needed
    const num2 = getRandomNumber(1, 11); // Adjust the range as needed
    const result = num1 + num2;
    return { statement: statement.replace(/___/, num1).replace(/___/, num2), result };
  }

  // Subtraction function
  // Subtraction function
function subtraction() {
  const index = getRandomNumber(0, subtractionArray.length);
  const statement = subtractionArray[index];
  let num1 = getRandomNumber(1, 11); // Adjust the range as needed
  let num2 = getRandomNumber(1, 11); // Adjust the range as needed
  // Ensure num2 is less than or equal to num1
  while (num2 > num1) {
    num1 = getRandomNumber(1, 11);
    num2 = getRandomNumber(1, 11);
  }
  const result = num1 - num2;
  return { statement: statement.replace(/___/, num1).replace(/___/, num2), result };
}


  // Multiplication function
 // Multiplication function
function multiplication() {
  const index = getRandomNumber(0, multiplicationArray.length);
  const statement = multiplicationArray[index];
  const num1 = getRandomNumber(1, 11); // Adjust the range as needed
  const num2 = getRandomNumber(1, 11); // Adjust the range as needed
  const result = num1 * num2;
  return { statement: statement.replace(/___/, num1).replace(/___/, num2), result };
}


  // Division function
  // Division function
function division() {
  const index = getRandomNumber(0, divisionArray.length);
  const statement = divisionArray[index];
  let num1 = getRandomNumber(1, 11); // Adjust the range as needed
  let num2 = getRandomNumber(1, 11); // Adjust the range as needed
  // Ensure num1 is divisible by num2 without remainder and num2 is not 1
  while (num1 % num2 !== 0 || num2 === 1) {
    num1 = getRandomNumber(1, 11);
    num2 = getRandomNumber(1, 11);
  }
  const result = num1 / num2;
  return { statement: statement.replace(/___/, num1).replace(/___/, num2), result };
}


  return (
    <div className={`container-style ${isBackgroundColorChanged ? 'background-changed' : ''} ${isBackgroundColorChanged ? 'cool-style-disabled' : 'cool-style'}`} style={isBackgroundColorChanged ? null : containerStyle}>
      <h1>Statement Page</h1>
      <p>This is the statement page content.</p>
      <button onClick={start}>Start</button>
      <p>{displayedStatement}</p>
      <p>Correct Result: {correctResult}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{feedbackMessage}</p>
    </div>
  );
}

export default StatementPage;