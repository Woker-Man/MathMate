import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OperationPage from './components/OperationPage.jsx'
import DragDropOperation from './components/DragDropOperation.jsx'
import RainOperation from './components/RainOperation.jsx';
import SimpleOperation from './components/SimpleOperation.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import HomePage from './components/HomePage.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx'

const App = ()=>{
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addition" element={<OperationPage operator="+" />} />
            <Route path="/subtraction" element={<OperationPage operator="-" />} />
            <Route path="/multiplication" element={<OperationPage operator="*" />} />
            <Route path="/division" element={<OperationPage operator="/" />} />
            <Route path="/addition-simple" element={<SimpleOperation operator="+" />} />
            <Route path="/addition-drag-drop" element={<DragDropOperation operator='+' />} />
            <Route path="/addition-rain" element={<RainOperation operator='+' />} />
            <Route path="/subtraction-simple" element={<SimpleOperation operator="-"/>} />
            <Route path="/subtraction-drag-drop" element={<DragDropOperation operator='-' />} />
            <Route path="/subtraction-rain" element={<RainOperation operator='-' />} />
            <Route path="/multiplication-simple" element={<SimpleOperation operator="*" />} />
            <Route path="/multiplication-drag-drop" element={<SimpleOperation operator="*" />} />
            <Route path="/multiplication-rain" element={<RainOperation operator="*" />} />
            <Route path="/division-simple" element={<SimpleOperation operator="/" />} />
            <Route path="/division-drag-drop" element={<DragDropOperation operator="/" />} />
            <Route path="/division-rain" element={<RainOperation operator="/" />} />
          </Routes>
        </main>
        <Footer />

      </Router>
    </DndProvider>
  );
}

export default App;
