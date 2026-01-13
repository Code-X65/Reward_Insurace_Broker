import React from 'react'
import InsuranceHero from '../components/InsuranceHero'
import AboutUsSection from '../components/AboutUsSection'
import StaffShowcase from '../components/StaffShowcase'
import ClientsPartnersSection from '../components/ClientsPartnersSection'
import ServicesSection from '../components/ServicesSection'
import IndustriesSection from '../components/IndustriesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'
import ContactSection from '../components/ContactSection'

const HomePage = () => {
  return (
    <>
      <div >
        <InsuranceHero />
        <AboutUsSection />
        <StaffShowcase />
        <ClientsPartnersSection />
        <ServicesSection />
        <IndustriesSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </div>

    </>
  )
}

export default HomePage