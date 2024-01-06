import React from 'react';
import "./App.css"
import Navbar from './components/Navbar';
import Home from './pages/Home';
function App() {
  return (
   <main className='w-full h-full scroll-smooth'>
        <Navbar/>
        <Home/>
   </main>
  )
}

export default App;
