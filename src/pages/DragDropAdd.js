// src/pages/DragDropAdd.js
import React, { useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constants/ItemTypes';

const Fruit = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FRUIT,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'move',
        display: 'inline-block',
        marginRight: '10px',
      }}
    >
      🍎 {name}
    </div>
  );
};

const Basket = ({ fruits, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.FRUIT,
    drop: (item) => onDrop(item.name),
  });

  return (
    <div
      ref={drop}
      style={{
        border: '2px solid #000',
        padding: '10px',
        marginTop: '20px',
        display: 'inline-block',
      }}
    >
      Basket: {fruits.join(' + ')}
    </div>
  );
};

const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const DragDropAdd = () => {
  const [numbers, setNumbers] = useState([getRandomNumber(), getRandomNumber()]);
  const [fruits, setFruits] = useState([]);
  const [userGuess, setUserGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const result = numbers.reduce((sum, num) => sum + num, 0);

  const handleDrop = useCallback(
    (fruit) => {
      setFruits([...fruits, fruit]);
    },
    [fruits]
  );

  const resetGame = () => {
    setNumbers([getRandomNumber(), getRandomNumber()]);
    setFruits([]);
    setUserGuess('');
    setGameOver(false);
  };

  const handleSubmit = () => {
    const userResult = fruits.reduce((sum, fruit) => sum + parseInt(fruit.replace('Fruit', '')), 0);

    if (userResult === result) {
      // Correct guess
      setGameOver(false);
    } else {
      // Incorrect guess
      setGameOver(true);
    }
  };

  return (
    <div>
      <h2>Drag and Drop Addition Game</h2>
      <div>
        {numbers.map((num, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
            {num}
          </div>
        ))}
        <div style={{ display: 'inline-block', marginRight: '10px' }}> = </div>
      </div>
      <div>
        {numbers.map((num, index) => (
          <Fruit key={index} name={`Fruit${num}`} />
        ))}
      </div>
      <Basket fruits={fruits} onDrop={handleDrop} />
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Your guess"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {gameOver && <p style={{ color: 'red' }}>Game Over! Incorrect guess.</p>}
      <button onClick={resetGame} style={{ marginTop: '20px' }}>
        Reset Game
      </button>
    </div>
  );
};

export default DragDropAdd;
