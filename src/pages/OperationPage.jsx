// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import './styles/Addition.css';
function OperationPage({operator}) {
  const navigate = useNavigate();

  const goToSimple = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    switch(operator) {
        case "+":
        navigate('/simpleAdd');
        break;
        case "-":
        navigate('/simplSub');
        break;
        case "*":
        navigate('/simpleMulti');
        break;
        case "/":
        navigate('/simpleDiv');
        break;
        default:
        console.log("Unknown Operator")
    }
  };

  const goToDragDrop = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    switch(operator) {
        case "+":
        navigate('/dragDropAdd');
        break;
        case "-":
        navigate('/dragDropSub');
        break;
        case "*":
        navigate('/MultiRain');
        break;
        case "/":
        navigate('/DivRain');
        break;
        default:
        console.log("Unknown Operator")
    }
  };

  const goToRain = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    switch(operator) {
        case "+":
        navigate('/dragDropAdd');
        break;
        case "-":
        navigate('/dragDropSub');
        break;
        case "*":
        navigate('/MultiRain');
        break;
        case "/":
        navigate('/DivRain');
        break;
        default:
        console.log("Unknown Operator")
    }
  };


  return (
    <div>
      <header className='header'>
      <h1 className='head'>Addition Page</h1>
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
