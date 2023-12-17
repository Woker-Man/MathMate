// src/pages/DragDropAdd.jsx
import React, { useState, useEffect } from 'react';

const appleImageUrl = 'https://purepng.com/public/uploads/large/purepng.com-red-appleapplemalus-domesticafruitdeliciousred-apple-170152716492043huf.png';

const DragDropAdd = () => {
  const [leftBoxImages, setLeftBoxImages] = useState([]);
  const [rightBoxImages, setRightBoxImages] = useState([]);
  const [basketImages, setBasketImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const updateBoxes = () => {
    let totalApples = getRandomNumber(2, 15); // Ensure at least one apple in each box
    const minLeftCount = 1; // Minimum number of apples in the left box
    const minRightCount = 1; // Minimum number of apples in the right box
    const leftCount = getRandomNumber(minLeftCount, Math.min(totalApples - minRightCount, 15 - minRightCount));
    const rightCount = totalApples - leftCount;

    const leftImages = Array(leftCount).fill(null).map((_, index) => ({ id: `${index}-${Date.now()}`, src: appleImageUrl }));
    const rightImages = Array(rightCount).fill(null).map((_, index) => ({ id: `${index}-${Date.now()}`, src: appleImageUrl }));

    setLeftBoxImages(leftImages);
    setRightBoxImages(rightImages);
  };

  useEffect(() => {
    updateBoxes();
  }, [currentIndex]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 1); // Only one type of image (apple)
    updateBoxes();
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedImage = document.getElementById(`draggable-apple-${id}`);

    if (draggedImage) {
      const rect = e.target.getBoundingClientRect();

      // Calculate the position relative to the target element
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      // Set the new position of the dragged image
      draggedImage.style.position = 'fixed'; // Use fixed position for absolute positioning on the entire page
      draggedImage.style.left = offsetX + 'px';
      draggedImage.style.top = offsetY + 'px';

      // Append the dragged image to the document body
      document.body.appendChild(draggedImage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBasketDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedImage = document.getElementById(`draggable-apple-${id}`);

    if (draggedImage) {
      // Remove the dragged image from the document body
      draggedImage.parentNode.removeChild(draggedImage);

      // Update the basketImages state
      setBasketImages((prevBasketImages) => [...prevBasketImages, id]);
    }
  };

  return (
    <div>
      <h1>DragDropAdd Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Box */}
        <div style={boxStyle}>
          <h2>Left Box</h2>
          {leftBoxImages.map(({ id, src }, index) => (
            <img
              key={id}
              id={`draggable-apple-${id}`}
              src={src}
              alt={`Object ${index}`}
              style={{ ...imageStyle, cursor: 'grab' }}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
            />
          ))}
        </div>

        {/* Plus Sign */}
        <div style={{ width: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn.onlinewebfonts.com/svg/img_25007.png" alt="Plus Sign" style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Right Box */}
        <div style={boxStyle}>
          <h2>Right Box</h2>
          {rightBoxImages.map(({ id, src }, index) => (
            <img
              key={id}
              id={`draggable-apple-${id}`}
              src={src}
              alt={`Object ${index}`}
              style={{ ...imageStyle, cursor: 'grab' }}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
            />
          ))}
        </div>

        {/* Draggable Apples Box */}
        <div
          style={boxStyle}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2>Draggable Apples</h2>
          {Array(15).fill(null).map((_, index) => (
            <img
              key={index}
              id={`draggable-apple-${index}`}
              src={appleImageUrl}
              alt={`Apple ${index}`}
              style={{ ...imageStyle, cursor: 'grab' }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={handleNextImage}>Submit</button>

      {/* Basket */}
      <div
        style={{ border: '1px solid black', padding: '10px', marginTop: '20px', minHeight: '100px' }}
        onDrop={handleBasketDrop}
        onDragOver={handleDragOver}
      >
        <h2>Basket</h2>
        {basketImages.map((id, index) => (
          <img
            key={index}
            id={`draggable-apple-${id}`}
            src={appleImageUrl}
            alt={`Basket Apple ${index}`}
            style={{ ...imageStyle, cursor: 'grab' }}
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DragDropAdd;

const boxStyle = {
  border: '1px solid black',
  padding: '10px',
  width: '340px', // Adjust the width of the boxes as needed
  height: '340px', // Adjust the height of the boxes as needed
};

const imageStyle = {
  width: '40px', // Fixed size for the apple images
  height: '40px', // Fixed size for the apple images
  objectFit: 'contain', // Ensure the entire image fits within the specified dimensions
};
