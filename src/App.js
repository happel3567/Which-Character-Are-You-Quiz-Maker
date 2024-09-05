
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import Home from './Home';
import './App.css';
import Play from './Play';
import { useNavigate } from 'react-router-dom';

  
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Play" element={<Play />} />
        </Routes>
      </Router>
      
    </div>
  );
}


export default App;