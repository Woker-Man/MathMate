// src/App.js

import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AdditionPage from './pages/AdditionPage';
import SubtractionPage from './pages/SubtractionPage';
import MultiplicationPage from './pages/MultiplicationPage';
import DivisionPage from './pages/DivisionPage';
import DragDropAdd from './pages/DragDropAdd';
import SimpleAdd from './pages/SimpleAdd';
import DragDropSub from './pages/DragDropSub';
import SimpleSub from './pages/SimpleSub';
 import MultiRain from './pages/MultiRain';
 import DivRain from './pages/DivRain';
//  import SimpleMulti from './pages/SimpleMulti';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const [showMathButtons, setShowMathButtons] = useState(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        {showMathButtons && (
          <header className="App-header">
            <h1>Welcome to MathMate</h1>
            {/* <p>Your user-friendly and inclusive platform for learning mathematics.</p> */}
          </header>
        )}
        <main>
          <div className="container">
            {/* Conditionally render math buttons based on state */}
            {showMathButtons && (
              <>
                <Link
                  to="/addition"
                  className="btn btn-primary mx-4"
                  onClick={() => setShowMathButtons(false)}
                >
                  Addition
                </Link>
                <Link
                  to="/subtraction"
                  className="btn btn-secondary mx-4"
                  onClick={() => setShowMathButtons(false)}
                >
                  Subtraction
                </Link>
                <Link
                  to="/multiplication"
                  className="btn btn-success mx-4"
                  onClick={() => setShowMathButtons(false)}
                >
                  Multiplication
                </Link>
                <Link
                  to="/division"
                  className="btn btn-danger mx-4"
                  onClick={() => setShowMathButtons(false)}
                >
                  Division
                </Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/addition" element={<AdditionPage />} />
            <Route path="/subtraction" element={<SubtractionPage />} />
            <Route path="/multiplication" element={<MultiplicationPage />} />
            <Route path="/division" element={<DivisionPage />} />
            <Route path="/dragDropAdd" element={<DragDropAdd />} />
            <Route path="/simpleAdd" element={<SimpleAdd />} />
            <Route path="/dragDropSub" element={<DragDropSub />} />
            <Route path="/simpleSub" element={<SimpleSub/>} />
            <Route path="/MultiRain" element={<MultiRain/>} />
            <Route path="/DivRain" element={<DivRain/>} />
            {/* <Route path="/simpleMulti" element={<SimpleMulti/>} /> */}
          </Routes>
        </main>
        <footer className="App-footer">
          {!showMathButtons && (
            <>
              <Link
                to="/"
                className="btn btn-primary mx-4"
                onClick={() => setShowMathButtons(true)}
              >
                Back
              </Link>
            </>
          )}
          <p>&copy; 2023 MathMate. All rights reserved.</p>
        </footer>
      </Router>
    </DndProvider>
  );
}

export default App;
