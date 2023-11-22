// src/pages/NewPage1.js
import React from 'react';
import { Link } from 'react-router-dom';

function SimpleAdd() {
  return (
    <div>
      <h2>SimpleAdd</h2>
      {/* Add content for New Page 1 */}
      <Link to="/addition" className="btn btn-primary mx-4">
        Back to Main Page
      </Link>
    </div>
  );
}

export default SimpleAdd;
