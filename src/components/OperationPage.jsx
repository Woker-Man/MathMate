// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import wordMappings from './utils/wordMappings'
import './styles/Addition.css';

const OperationPage = ({operator})=>{
  const navigate = useNavigate();

  const goToSimple = () => {
      navigate(`/${wordMappings.lower[operator]}-simple`)
  };

  const goToDragDrop = () => {
      navigate(`/${wordMappings.lower[operator]}-drag-drop`)
  };

  const goToRain = () => {
      navigate(`/${wordMappings.lower[operator]}-rain`)
  };

    useEffect(()=>{

    },[])


  return (
    <div>
      <header className='header'>
      <h1 className='head'>{wordMappings.capitalized[operator]} Page</h1>
      </header>
    <div className="Addition">

      <div className="container">
      <button className="button btn btn-primary mx-4" onClick={goToDragDrop}>
        DragDrop
      </button>
      <button className="button btn btn-secondary mx-4" onClick={goToSimple}>
        Simple
      </button>
      <button className="button btn btn-secondary mx-4" onClick={goToRain}>
        Rain
      </button>
      </div>
    </div>
    </div>
  );
}

export default OperationPage;
