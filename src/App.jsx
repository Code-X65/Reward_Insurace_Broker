import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './components/Footer'
import News from './Pages/News'
import InsuranceGuide from './Pages/InsuranceGuide'
import PrivacyStatement from './Pages/PrivacyStatement'
import TermsOfService from './Pages/TermsOfService'
import QuoteForm from './components/Qouteform'  // Add this import
import { FormProvider } from '../src/context/FormContext';

const App = () => {
  return (
    <div>
      <FormProvider>
        <Router basename='Reward_Insurace_Broker'>
          <Navbar />
          <QuoteForm />  {/* Add this line */}
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/news' element={<News />} />
            <Route path='/insurance-guide' element={<InsuranceGuide />} />
            <Route path='/privacy' element={<PrivacyStatement />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
          </Routes>
          <Footer />
        </Router>
      </FormProvider>
    </div>
  )
}

export default App