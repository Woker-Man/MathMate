// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
// import './styles/Multi.css';
function DivisionPage() {
  const navigate = useNavigate();

  const goToDragDropAdd = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    navigate('/DivRain');
  };

  const goToSimpleAdd = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    navigate('/simpleDiv');
  };

  return (
    <div>
      <header>
      <h2>Division Page</h2>
      </header>
    <div className="Addition">
      
      <div className="container">
      <button className="btn btn-primary mx-4" onClick={goToDragDropAdd}>
        Division Rain 
      </button>
      <button className="btn btn-secondary mx-4" onClick={goToSimpleAdd}>
        Simple Div
      </button>
      </div>
    </div>
    </div>
  );
}

export default DivisionPage;
