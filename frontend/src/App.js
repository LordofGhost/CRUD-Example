import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path='/create' element={<CreateProduct />} />
          <Route exact path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export let path = "http://localhost:5093";
export default App;
