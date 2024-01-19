import './scss/app.scss';
import Header from './components/Header.jsx';
import React from 'react';
import pizzas from './assets/pizzas.json';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';
import { Route, Routes } from 'react-router-dom';

console.log(pizzas);

function App() {


  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>         
        </div>
      </div>
    </div>
  );
}

export default App;
