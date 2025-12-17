import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './components/Footer'
import News from './Pages/News'

const App = () => {
  return (
  <>
  <div> 

    <Router basename='Reward_Insurace_Broker'>
      <Navbar/> 
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path='/news' element={<News />}/>
      </Routes>
      <Footer/>
    </Router>
  </div>
  </>
  )
}

export default App