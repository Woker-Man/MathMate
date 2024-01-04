// src/pages/AdditionPage.js
import { useNavigate } from 'react-router-dom';
import './styles/Addition.css';
function AdditionPage() {
  const navigate = useNavigate();

  const goToDragDropAdd = () => {
    // Use navigate('/dragDropAdd') to navigate to DragDropAdd Page
    navigate('/dragDropAdd');
  };

  const goToSimpleAdd = () => {
    // Use navigate('/simpleAdd') to navigate to SimpleAdd Page
    navigate('/simpleAdd');
  };

  return (
    <div>
      <header className='header'>
      <h1 className='head'>Addition Page</h1>
      </header>
    <div className="Addition">
      
      <div className="container">
      <button className="button btn btn-primary mx-4" onClick={goToDragDropAdd}>
        DragDropAdd
      </button>
      <button className="button btn btn-secondary mx-4" onClick={goToSimpleAdd}>
        SimpleAdd 
      </button>
      </div>
    </div>
    </div>
  );
}

export default AdditionPage;
