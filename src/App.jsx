import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OperationPage from './pages/OperationPage.jsx'
import DragDropOperation from './pages/DragDropOperation.jsx'
import SimpleSub from './pages/SimpleSub';
import RainOperation from './pages/RainOperation.jsx';
import SimpleMulti from './pages/SimpleMulti';
import SimpleDiv from './pages/SimpleDiv';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import HomePage from './pages/HomePage.jsx';
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
            <Route path="/dragDropAdd" element={<DragDropOperation operator='+' />} />
            <Route path="/simpleAdd" element={<SimpleAdd />} />
            <Route path="/dragDropSub" element={<DragDropOperation operator='-' />} />
            <Route path="/simpleSub" element={<SimpleSub/>} />
            <Route path="/MultiRain" element={<RainOperation operator="*" />} />
            <Route path="/DivRain" element={<RainOperation operator="/" />} />
            <Route path="/simpleMulti" element={<SimpleMulti/>} />
            <Route path="/simpleDiv" element={<SimpleDiv/>} />
          </Routes>
        </main>
        <Footer />

      </Router>
    </DndProvider>
  );
}

export default App;
