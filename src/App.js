import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ShoppingListDetail from './components/ShoppingListDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;