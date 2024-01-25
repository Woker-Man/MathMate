// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/Addition.css';
function OperationPage({operator}) {
  const navigate = useNavigate();
  const [operationName,setOperationName]= useState("Operation")

  const goToSimple = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    switch(operator) {
        case "+":
        navigate('/simple-add');
        break;
        case "-":
        navigate('/simple-sub');
        break;
        case "*":
        navigate('/simple-multi');
        break;
        case "/":
        navigate('/simple-div');
        break;
        default:
        console.log("Unknown Operator")
    }
  };

  const goToDragDrop = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    switch(operator) {
        case "+":
        navigate('/drag-drop-add');
        break;
        case "-":
        navigate('/drag-drop-sub');
        break;
        case "*":
        navigate('/drag-drop-multi');
        break;
        case "/":
        navigate('/drag-drop-div');
        break;
        default:
        console.log("Unknown Operator")
    }
  };

  const goToRain = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    switch(operator) {
        case "+":
        navigate('/rain-add');
        break;
        case "-":
        navigate('/rain-sub');
        break;
        case "*":
        navigate('/rain-multi');
        break;
        case "/":
        navigate('/rain-div');
        break;
        default:
        console.log("Unknown Operator")
    }
  };

    useEffect(()=>{

        switch(operator) {
            case "+":
            setOperationName("Addition")
            break;
            case "-":
            setOperationName("Subtraction")
            break;
            case "*":
            setOperationName("Multiplication")
            break;
            case "/":
            setOperationName("Division")
            break;
            default:
            console.log("Unknown Operator")
        }

    },[])


  return (
    <div>
      <header className='header'>
      <h1 className='head'>{operationName} Page</h1>
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
