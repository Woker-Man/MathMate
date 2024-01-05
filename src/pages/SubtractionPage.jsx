// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import './styles/Addition.css';
function SubtractionPage() {
  const navigate = useNavigate();

  const goToDragDropAdd = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    navigate('/dragDropSub');
  };

  const goToSimpleAdd = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    navigate('/simpleSub');
  };

  return (
    <div>
      <header className='header'>
      <h1 className='head'>Subtraction Page</h1>
      </header>
    <div className="Addition">
      
      <div className="container">
      <button className="button btn btn-primary mx-4" onClick={goToDragDropAdd}>
        DragDropSub
      </button>
      <button className="button btn btn-secondary mx-4" onClick={goToSimpleAdd}>
        SimpleSub
      </button>
      </div>
    </div>
    </div>
  );
}

export default SubtractionPage;
