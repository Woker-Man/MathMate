// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
// import './styles/Multi.css';
function MultiplicationPage() {
  const navigate = useNavigate();

  const goToDragDropAdd = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    navigate('/MultiRain');
  };

  const goToSimpleAdd = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    navigate('/simpleMulti');
  };

  return (
    <div>
      <header className='header'>
      <h1 className='head'>Multiplication Page</h1>
      </header>
    <div className="Addition">
      
      <div className="container">
      <button className="button btn btn-primary mx-4" onClick={goToDragDropAdd}>
        Multiplication Rain 
      </button>
      <button className="button btn btn-secondary mx-4" onClick={goToSimpleAdd}>
        SimpleMulti
      </button>
      </div>
    </div>
    </div>
  );
}

export default MultiplicationPage;
