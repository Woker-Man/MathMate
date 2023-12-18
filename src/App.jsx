// src/App.js

import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AdditionPage from './pages/AdditionPage';
import SubtractionPage from './pages/SubtractionPage';
import MultiplicationPage from './pages/MultiplicationPage';
import DivisionPage from './pages/DivisionPage';
import DragDropAdd from './pages/DragDropAdd';
import SimpleAdd from './pages/SimpleAdd';
import Footer from './components/footer.jsx'
import Header from './components/header.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addition" element={<AdditionPage />} />
            <Route path="/subtraction" element={<SubtractionPage />} />
            <Route path="/multiplication" element={<MultiplicationPage />} />
            <Route path="/division" element={<DivisionPage />} />
            <Route path="/dragDropAdd" element={<DragDropAdd />} />
            <Route path="/simpleAdd" element={<SimpleAdd />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </DndProvider>
  );
}

export default App;
