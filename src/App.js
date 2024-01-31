import './scss/app.scss'
import Header from './components/Header.jsx'
import React from 'react'
import pizzas from './assets/pizzas.json'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'
import { Route, Routes } from 'react-router-dom'

console.log(pizzas)

export const SearchContext = React.createContext();

function App() {
 
  const [searchValue, setSearchValue] = React.useState('');
   console.log(searchValue);
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      </SearchContext.Provider>
      
    </div>
  )
}

export default App
