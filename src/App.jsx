import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './components/Footer'

const App = () => {
  return (
  <>
  <div> 

    <Router basename='Reward_Insurace_Broker'>
      <Navbar/> 
      <Routes>
        <Route index element={<HomePage />}/>
      </Routes>
      <Footer/>
    </Router>
  </div>
  </>
  )
}

export default App