// src/pages/DragDropAdd.jsx

import React, { useState } from 'react';

const DragDropAdd = () => {
  const imageUrls = [
    'https://purepng.com/public/uploads/large/purepng.com-red-appleapplemalus-domesticafruitdeliciousred-apple-170152716492043huf.png',
    'https://www.pngall.com/wp-content/uploads/2016/05/Orange-Free-PNG-Image.png',
    'https://tse4.mm.bing.net/th?id=OIP.F5697DlI3BFmA8Ki4bed8wHaFc&pid=Api&P=0&h=180',
    'https://freepngimg.com/download/cherry/34970-4-cherry-fruit-image.png',
    'https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754290sbcsq.png'
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    // Increment the index or loop back to the beginning if it exceeds the array length
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <div>
      <h1>DragDropAdd Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Box */}
        <div style={{ border: '1px solid black', padding: '10px', width: '30%' }}>
          <h2>Left Box</h2>
          <img src={imageUrls[currentIndex]} alt={`Object ${currentIndex}`} style={{ width: '100%', height: 'auto' }} />
          {/* Add content specific to the left box if needed */}
        </div>

        {/* Plus Sign */}
        <div style={{width: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn.onlinewebfonts.com/svg/img_25007.png" alt="Plus Sign" style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Right Box */}
        <div style={{ border: '1px solid black', padding: '10px', width: '30%' }}>
          <h2>Right Box</h2>
          <img src={imageUrls[currentIndex]} alt={`Object ${currentIndex}`} style={{ width: '100%', height: 'auto' }} />
          {/* Add content specific to the right box if needed */}
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={handleNextImage}>Submit</button>

      {/* Basket */}
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
        <h2>Basket</h2>
        {/* Add content specific to the basket if needed */}
      </div>
    </div>
  );
};

export default DragDropAdd;
