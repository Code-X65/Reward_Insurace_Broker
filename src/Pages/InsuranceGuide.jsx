import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InsuranceGuide = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  // Navigation handler for getting quote
  const handleGetQuote = (insuranceType) => {
    // If not on homepage, navigate to homepage first and scroll to contact
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contact' } });
    } else {
      // Scroll to contact section on homepage
      const target = document.getElementById('contact');
      if (target) {
        const navbarHeight = 64;
        const targetPosition = 
          target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  // Insurance categories
  const categories = [
    { id: 'all', name: 'All Insurance Types' },
    { id: 'personal', name: 'Personal Insurance' },
    { id: 'property', name: 'Property Insurance' },
    { id: 'business', name: 'Business Insurance' },
    { id: 'specialty', name: 'Specialty Insurance' }
  ];

  // Insurance guide data
  const insuranceGuides = [
    {
      id: 1,
      title: 'Life Insurance',
      category: 'personal',
      description: 'Financial protection for your loved ones in case of your untimely death.',
      icon: '💼',
      features: [
        'Term Life Insurance',
        'Whole Life Insurance',
        'Universal Life Insurance',
        'Critical Illness Cover'
      ],
      benefits: [
        'Financial security for family',
        'Debt coverage',
        'Education funds for children',
        'Estate planning'
      ],
      whoNeedsIt: 'Breadwinners, Parents, Business Owners, Anyone with dependents'
    },
    {
      id: 2,
      title: 'Health Insurance',
      category: 'personal',
      description: 'Covers medical expenses and healthcare costs for you and your family.',
      icon: '🏥',
      features: [
        'Hospitalization Coverage',
        'Outpatient Services',
        'Maternity Benefits',
        'Dental & Optical Care'
      ],
      benefits: [
        'Access to quality healthcare',
        'Financial protection against medical bills',
        'Preventive care coverage',
        'Emergency medical evacuation'
      ],
      whoNeedsIt: 'Individuals, Families, Seniors, Employees'
    },
    {
      id: 3,
      title: 'Motor Insurance',
      category: 'property',
      description: 'Protects your vehicle against accidents, theft, and third-party liabilities.',
      icon: '🚗',
      features: [
        'Comprehensive Coverage',
        'Third Party Liability',
        'Theft Protection',
        'Accident Cover'
      ],
      benefits: [
        'Vehicle repair/replacement',
        'Third-party injury coverage',
        'Legal defense costs',
        'Personal accident cover'
      ],
      whoNeedsIt: 'Vehicle Owners, Commercial Fleets, Motorcyclists'
    },
    {
      id: 4,
      title: 'Home Insurance',
      category: 'property',
      description: 'Protects your home and belongings from damage, theft, and natural disasters.',
      icon: '🏠',
      features: [
        'Building Structure Cover',
        'Contents Insurance',
        'Personal Liability',
        'Alternative Accommodation'
      ],
      benefits: [
        'Rebuild/repair costs covered',
        'Personal belongings protection',
        'Liability for accidents at home',
        'Temporary housing if uninhabitable'
      ],
      whoNeedsIt: 'Homeowners, Renters, Landlords, Property Investors'
    },
    {
      id: 5,
      title: 'Travel Insurance',
      category: 'personal',
      description: 'Covers unexpected events during domestic or international travel.',
      icon: '✈️',
      features: [
        'Trip Cancellation',
        'Medical Emergencies',
        'Lost Luggage',
        'Flight Delays'
      ],
      benefits: [
        'Emergency medical treatment',
        'Trip interruption coverage',
        '24/7 travel assistance',
        'Baggage delay compensation'
      ],
      whoNeedsIt: 'Frequent Travelers, Vacationers, Business Travelers, Students Abroad'
    },
    {
      id: 6,
      title: 'Business Insurance',
      category: 'business',
      description: 'Comprehensive protection for businesses against various risks and liabilities.',
      icon: '🏢',
      features: [
        'Professional Liability',
        'Property Insurance',
        'Business Interruption',
        'Workers Compensation'
      ],
      benefits: [
        'Protects business assets',
        'Covers legal liabilities',
        'Business continuity support',
        'Employee protection'
      ],
      whoNeedsIt: 'Small Businesses, Corporations, Entrepreneurs, Startups'
    },
    {
      id: 7,
      title: 'Marine Insurance',
      category: 'specialty',
      description: 'Covers ships, cargo, terminals, and any transport of goods over water.',
      icon: '🚢',
      features: [
        'Hull Insurance',
        'Cargo Insurance',
        'Freight Insurance',
        'Liability Coverage'
      ],
      benefits: [
        'Cargo loss/damage protection',
        'Ship repair/replacement',
        'Third-party liability',
        'Piracy and war risks'
      ],
      whoNeedsIt: 'Shipping Companies, Importers/Exporters, Logistics Firms'
    },
    {
      id: 8,
      title: 'Aviation Insurance',
      category: 'specialty',
      description: 'Specialized insurance for aircraft, airlines, and aviation-related risks.',
      icon: '🛩️',
      features: [
        'Aircraft Hull Insurance',
        'Liability Insurance',
        'Passenger Liability',
        'Airport Liability'
      ],
      benefits: [
        'Aircraft damage/loss',
        'Third-party injury coverage',
        'Passenger accident protection',
        'Ground risk coverage'
      ],
      whoNeedsIt: 'Airlines, Private Jet Owners, Aircraft Manufacturers, Airports'
    },
    {
      id: 9,
      title: 'Professional Liability',
      category: 'business',
      description: 'Protects professionals against negligence claims and work-related errors.',
      icon: '⚖️',
      features: [
        'Errors & Omissions',
        'Negligence Coverage',
        'Defense Costs',
        'Settlement Coverage'
      ],
      benefits: [
        'Legal defense costs',
        'Settlement coverage',
        'Reputation protection',
        'Client dispute resolution'
      ],
      whoNeedsIt: 'Doctors, Lawyers, Consultants, Architects, Engineers'
    }
  ];

  // Filtered guides based on active category
  const filteredGuides = activeCategory === 'all' 
    ? insuranceGuides 
    : insuranceGuides.filter(guide => guide.category === activeCategory);

  // Frequently Asked Questions
  const faqs = [
    {
      question: 'How much insurance coverage do I really need?',
      answer: 'The amount of coverage depends on factors like your income, assets, debts, family size, and future financial goals. A general rule is to have life insurance coverage 10-15 times your annual income.'
    },
    {
      question: 'What factors affect my insurance premium?',
      answer: 'Premiums are calculated based on age, health status, occupation, lifestyle habits, coverage amount, deductible amount, and in case of vehicles - make, model, age, and usage.'
    },
    {
      question: 'Can I switch insurance providers easily?',
      answer: 'Yes, you can switch providers at any time. However, it\'s important to ensure there\'s no gap in coverage and to compare benefits carefully before making a change.'
    },
    {
      question: 'What\'s the difference between term and whole life insurance?',
      answer: 'Term life provides coverage for a specific period (10, 20, 30 years) at lower premiums. Whole life provides lifelong coverage with a savings/investment component and higher premiums.'
    },
    {
      question: 'When should I review my insurance policies?',
      answer: 'Review your policies annually or whenever you experience major life changes like marriage, birth of a child, buying a home, changing jobs, or significant income changes.'
    }
  ];

  // Tips for choosing insurance
  const insuranceTips = [
    'Assess your specific risks before purchasing',
    'Compare quotes from multiple providers',
    'Understand policy exclusions and limitations',
    'Consider bundling policies for discounts',
    'Review deductibles and coverage limits carefully',
    'Check the insurer\'s financial strength rating',
    'Read customer reviews and claim settlement ratio',
    'Consult with a licensed insurance advisor'
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Complete <span className="text-green-500">Insurance Guide</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Everything you need to know about insurance - from basic concepts to choosing the right coverage for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => handleGetQuote()}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Get Personalized Advice
                </button>
                <a 
                  href="#faq-section"
                  className="px-8 py-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-lg transition-colors"
                >
                  Read FAQs
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-500 text-white'
                        : isDark 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Guides Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map(guide => (
                <div 
                  key={guide.id}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-4xl mb-2">{guide.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                          guide.category === 'personal' ? 'bg-blue-500/20 text-blue-500' :
                          guide.category === 'property' ? 'bg-green-500/20 text-green-500' :
                          guide.category === 'business' ? 'bg-purple-500/20 text-purple-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {categories.find(c => c.id === guide.category)?.name || 'Other'}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {guide.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Key Features
                        </h4>
                        <ul className={`space-y-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {guide.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Main Benefits
                        </h4>
                        <ul className={`space-y-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {guide.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          Who Needs It
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {guide.whoNeedsIt}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleGetQuote(guide.title)}
                      className="w-full mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Get {guide.title} Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto rounded-2xl p-8 ${
              isDark 
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700' 
                : 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-100'
            }`}>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Tips for Choosing the Right Insurance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insuranceTips.map((tip, index) => (
                  <div 
                    key={index}
                    className={`flex items-start p-4 rounded-lg ${
                      isDark ? 'bg-gray-700/50' : 'bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      isDark ? 'bg-green-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {index + 1}
                    </div>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className={`rounded-xl overflow-hidden ${
                    isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      {faq.question}
                    </h3>
                    <p className={`pl-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center ${
              isDark 
                ? 'bg-gradient-to-r from-green-900 to-blue-900' 
                : 'bg-gradient-to-r from-green-600 to-blue-600'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Need Personalized Insurance Advice?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Our licensed insurance advisors are ready to help you find the perfect coverage for your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleGetQuote()}
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-green-600 font-bold rounded-lg transition-colors"
                >
                  Get Free Consultation
                </button>
                <a 
                  href="tel:+2348033906410"
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-colors"
                >
                  Call Now: +234 803 390 6410
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Glossary Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Insurance Terms Explained
            </h2>
            <div className={`max-w-6xl mx-auto rounded-xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { term: 'Premium', definition: 'The amount you pay for your insurance policy, typically monthly or annually.' },
                  { term: 'Deductible', definition: 'The amount you pay out-of-pocket before your insurance coverage kicks in.' },
                  { term: 'Coverage Limit', definition: 'The maximum amount your insurer will pay for a covered claim.' },
                  { term: 'Policyholder', definition: 'The person who owns the insurance policy.' },
                  { term: 'Beneficiary', definition: 'The person who receives the insurance payout in case of a claim.' },
                  { term: 'Claim', definition: 'A formal request to your insurance company for payment under your policy.' },
                  { term: 'Exclusion', definition: 'Specific conditions or circumstances not covered by your insurance policy.' },
                  { term: 'Rider', definition: 'An add-on to your basic policy that provides additional coverage.' },
                  { term: 'Underwriting', definition: 'The process insurers use to evaluate risk and determine premiums.' },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <h4 className="font-bold text-lg mb-2 text-green-600">{item.term}</h4>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InsuranceGuide;