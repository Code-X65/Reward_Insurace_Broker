import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext'; 

const ServicesSection = () => {
  const { openForm } = useForm();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const lifeInsuranceRef = useRef(null);
  const nonLifeInsuranceRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  // Horizontal scroll on mouse wheel
  useEffect(() => {
    const handleWheel = (e, ref) => {
      if (!ref.current) return;
      
      const container = ref.current;
      const rect = container.getBoundingClientRect();
      
      // Check if container is in viewport
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const isAtStart = container.scrollLeft === 0;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        
        // If scrolling down and not at end, scroll horizontally
        if (e.deltaY > 0 && !isAtEnd) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
        // If scrolling up and not at start, scroll horizontally
        else if (e.deltaY < 0 && !isAtStart) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    const lifeHandler = (e) => handleWheel(e, lifeInsuranceRef);
    const nonLifeHandler = (e) => handleWheel(e, nonLifeInsuranceRef);

    window.addEventListener('wheel', lifeHandler, { passive: false });
    window.addEventListener('wheel', nonLifeHandler, { passive: false });

    return () => {
      window.removeEventListener('wheel', lifeHandler);
      window.removeEventListener('wheel', nonLifeHandler);
    };
  }, []);

const lifeInsurance = [
  {
    title: 'Group Life Insurance',
    description: 'Comprehensive employer-sponsored life coverage protecting multiple employees under one policy.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1200&fit=crop&q=90',
    icon: '👥',
    features: ['Multi-Employee Coverage', 'Employer Benefits', 'Death Benefits', 'Accidental Death'],
    stats: { clients: '500+', satisfaction: '98%', employees: '50K+' },
    details: 'Protect your entire workforce with our group life insurance. Cost-effective coverage for businesses of all sizes, providing employees and their families with financial security and peace of mind.'
  },
  {
    title: 'Individual Life Insurance',
    description: 'Personalized life coverage tailored to your unique needs and family protection goals.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=1200&fit=crop&q=90',
    icon: '🛡️',
    features: ['Family Protection', 'Term Life Options', 'Whole Life Plans', 'Critical Illness Rider'],
    stats: { clients: '75K+', satisfaction: '99%', payout: '$1.5B+' },
    details: 'Secure your family\'s future with customized individual life insurance. Choose from term or whole life options with flexible premiums and comprehensive coverage that grows with your needs.'
  },
  {
    title: 'Group Personal',
    description: 'Combined group personal accident and health coverage for organizations and their employees.',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1600&h=1200&fit=crop&q=90',
    icon: '🏥',
    features: ['Accident Coverage', 'Medical Benefits', 'Disability Protection', 'Emergency Care'],
    stats: { clients: '800+', satisfaction: '97%', members: '65K+' },
    details: 'Comprehensive group personal accident and health insurance for your organization. Provides employees with medical coverage, accident protection, and disability benefits under one convenient policy.'
  },
  {
    title: 'Annuity Life Policy',
    description: 'Guaranteed income for life with strategic retirement planning and wealth accumulation.',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1600&h=1200&fit=crop&q=90',
    icon: '💰',
    features: ['Lifetime Income', 'Retirement Planning', 'Tax-Deferred Growth', 'Death Benefits'],
    stats: { clients: '30K+', satisfaction: '99%', income: 'Guaranteed' },
    details: 'Enjoy financial security in retirement with our annuity life policies. Guaranteed income streams, tax-deferred growth, and flexible payout options ensure you maintain your lifestyle throughout retirement.'
  }
];

const nonLifeInsurance = [
  {
    title: 'Motor Insurance',
    description: 'Complete vehicle protection with instant claims processing and 24/7 roadside assistance.',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&h=1200&fit=crop&q=90',
    icon: '🚗',
    features: ['Accident Coverage', 'Theft Protection', 'Roadside Assistance', 'Third Party Liability'],
    stats: { clients: '200K+', satisfaction: '97%', claims: '24h' },
    details: 'Drive with confidence knowing you\'re fully protected. Our motor insurance covers everything from minor scratches to major accidents, with hassle-free claims and instant support.'
  },
  {
    title: 'Fire and Special perils',
    description: 'Comprehensive protection against fire, lightning, explosion, and other special perils.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&h=1200&fit=crop&q=90',
    icon: '🔥',
    features: ['Fire Damage', 'Lightning Strike', 'Explosion Coverage', 'Earthquake Protection'],
    stats: { clients: '85K+', satisfaction: '96%', response: '3h' },
    details: 'Protect your property against fire and special perils with comprehensive coverage. From residential to commercial properties, we ensure rapid response and full protection against unexpected disasters.'
  },
  {
    title: 'Consequential Loss Insurance',
    description: 'Business interruption coverage protecting your income when operations are disrupted.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop&q=90',
    icon: '📊',
    features: ['Lost Profits', 'Fixed Costs Coverage', 'Revenue Protection', 'Business Continuity'],
    stats: { clients: '30K+', satisfaction: '95%', recovery: 'Fast' },
    details: 'Safeguard your business income against interruptions. Our consequential loss insurance ensures you maintain financial stability during unexpected shutdowns or operational disruptions.'
  },
  {
    title: 'Combined All Risk Insurance',
    description: 'All-encompassing property protection covering multiple perils under one comprehensive policy.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1200&fit=crop&q=90',
    icon: '🏢',
    features: ['Multi-Peril Coverage', 'Property Damage', 'Contents Protection', 'Business Assets'],
    stats: { clients: '50K+', satisfaction: '97%', coverage: 'Complete' },
    details: 'Experience ultimate peace of mind with our combined all risk insurance. One policy covers your property, contents, and business assets against virtually all risks of physical loss or damage.'
  },
  {
    title: 'Buglary and House Breaking Insurance',
    description: 'Protection against theft, burglary, and forced entry into your property or premises.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1600&h=1200&fit=crop&q=90',
    icon: '🔐',
    features: ['Theft Coverage', 'Break-in Protection', 'Forced Entry Damage', 'Contents Security'],
    stats: { clients: '40K+', satisfaction: '94%', response: '1h' },
    details: 'Secure your property against burglary and housebreaking. Our comprehensive coverage protects your valuables and property damage resulting from theft or forced entry.'
  },
  {
    title: 'Goods In-Transit Insurance',
    description: 'Comprehensive cargo protection while goods are being transported by road, rail, or air.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=1200&fit=crop&q=90',
    icon: '🚚',
    features: ['Transit Coverage', 'Damage Protection', 'Theft in Transit', 'Loading/Unloading Risk'],
    stats: { clients: '35K+', satisfaction: '96%', coverage: 'Nationwide' },
    details: 'Transport your goods with confidence. Our goods in-transit insurance provides comprehensive protection from warehouse to destination, covering all risks during transportation.'
  },
  {
    title: 'Cash In Transit Insurance',
    description: 'Specialized protection for cash and valuables being transported from one location to another.',
    image: 'https://images.unsplash.com/photo-1621981386829-9b458a2cdbde?w=1600&h=1200&fit=crop&q=90',
    icon: '💰',
    features: ['Cash Protection', 'Armed Robbery Cover', 'Courier Coverage', 'ATM Replenishment'],
    stats: { clients: '12K+', satisfaction: '98%', security: '24/7' },
    details: 'Secure your cash movements with specialized transit insurance. Perfect for banks, retailers, and businesses handling large cash volumes with round-the-clock protection.'
  },
  {
    title: 'Fidelity Guanrantee Insurance',
    description: 'Protection against financial loss caused by dishonest acts of employees.',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&h=1200&fit=crop&q=90',
    icon: '🤝',
    features: ['Employee Dishonesty', 'Fraud Protection', 'Embezzlement Cover', 'Financial Loss Recovery'],
    stats: { clients: '20K+', satisfaction: '95%', claims: 'Confidential' },
    details: 'Protect your business from internal fraud and employee dishonesty. Our fidelity guarantee insurance covers financial losses resulting from fraudulent acts by your staff.'
  },
  {
    title: 'Public Liablity Insurance',
    description: 'Legal protection against claims from third parties for injury or property damage.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=1200&fit=crop&q=90',
    icon: '👥',
    features: ['Third Party Claims', 'Bodily Injury Cover', 'Property Damage', 'Legal Defense'],
    stats: { clients: '60K+', satisfaction: '96%', defense: '24/7' },
    details: 'Safeguard your business against public liability claims. We provide comprehensive coverage for third-party injuries and property damage with full legal defense support.'
  },
  {
    title: 'Product Liablity Insurance',
    description: 'Coverage for manufacturers and sellers against claims arising from defective products.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1600&h=1200&fit=crop&q=90',
    icon: '📦',
    features: ['Product Defects', 'Consumer Injury', 'Recall Costs', 'Legal Defense'],
    stats: { clients: '15K+', satisfaction: '97%', coverage: 'International' },
    details: 'Manufacture and sell with confidence. Our product liability insurance protects against claims of injury or damage caused by defective products, including recall expenses.'
  },
  {
    title: 'Contractor All Risk Insurance',
    description: 'Comprehensive coverage for construction projects from start to completion.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1200&fit=crop&q=90',
    icon: '🏗️',
    features: ['Construction Works', 'Material Damage', 'Third Party Liability', 'Equipment Coverage'],
    stats: { clients: '18K+', satisfaction: '96%', projects: '8K+' },
    details: 'Build with confidence using our contractor all risk insurance. Comprehensive protection for construction projects covering materials, equipment, and third-party liabilities.'
  },
  {
    title: 'Engineering Insurance',
    description: 'Specialized coverage for machinery breakdown, electronic equipment, and boiler operations.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop&q=90',
    icon: '⚙️',
    features: ['Machinery Breakdown', 'Electronic Equipment', 'Boiler Explosion', 'Loss of Profits'],
    stats: { clients: '22K+', satisfaction: '97%', response: '4h' },
    details: 'Protect your critical machinery and equipment with specialized engineering insurance. Coverage for breakdowns, electronic failures, and resulting business interruption.'
  },
  {
    title: 'Industrial All Risk',
    description: 'Complete property and business interruption coverage for industrial operations.',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1600&h=1200&fit=crop&q=90',
    icon: '🏭',
    features: ['Factory Coverage', 'Plant & Machinery', 'Stock Protection', 'Business Interruption'],
    stats: { clients: '28K+', satisfaction: '98%', coverage: 'Comprehensive' },
    details: 'Comprehensive protection for industrial facilities covering property, machinery, stock, and business interruption under a single policy for complete peace of mind.'
  },
  {
    title: 'Professional indemnity Insurance',
    description: 'Legal protection and malpractice coverage for professionals and consultants.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=1200&fit=crop&q=90',
    icon: '⚖️',
    features: ['Malpractice Cover', 'Errors & Omissions', 'Legal Defense', 'Reputation Protection'],
    stats: { clients: '25K+', satisfaction: '98%', defense: '24/7' },
    details: 'Practice with peace of mind. Our professional indemnity insurance protects your reputation and finances with comprehensive liability coverage and 24/7 legal support.'
  },
  {
    title: 'Marine Insurance',
    description: 'Global cargo and vessel protection for seamless international trade operations.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&h=1200&fit=crop&q=90',
    icon: '🚢',
    features: ['Cargo Protection', 'Vessel Coverage', 'Transit Insurance', 'Port Risk'],
    stats: { clients: '10K+', satisfaction: '96%', coverage: 'Global' },
    details: 'Navigate international waters with confidence. Our marine insurance solutions cover importers, exporters, and shipping companies with comprehensive global protection.'
  },
  {
    title: 'Aviation Insurance',
    description: 'Specialized aircraft coverage for private owners, airlines, and aviation businesses.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&h=1200&fit=crop&q=90',
    icon: '✈️',
    features: ['Aircraft Hull', 'Liability Cover', 'Passenger Protection', 'Ground Risk'],
    stats: { clients: '5K+', satisfaction: '99%', partners: 'Global' },
    details: 'Fly secure with our specialized aviation insurance. We provide comprehensive coverage for aircraft, passengers, and operations with global partnerships.'
  },
  {
    title: 'Energy Insurance',
    description: 'Specialized coverage for oil, gas, and renewable energy operations and infrastructure.',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1600&h=1200&fit=crop&q=90',
    icon: '⚡',
    features: ['Oil & Gas Coverage', 'Renewable Energy', 'Pipeline Protection', 'Exploration Risk'],
    stats: { clients: '8K+', satisfaction: '97%', coverage: 'Specialized' },
    details: 'Power your energy operations with confidence. Our specialized energy insurance covers oil, gas, and renewable energy projects with comprehensive risk management solutions.'
  }
];


const ServiceCard = ({ service, index }) => (
  <div
    className={`flex-shrink-0 w-[320px] sm:w-[340px] p-8 rounded-2xl transition-all duration-300 snap-start ${
      isDark 
        ? 'bg-gray-900/50 border border-gray-800 hover:border-green-500/50' 
        : 'bg-white border border-gray-200 hover:border-green-500/50'
    } hover:shadow-xl hover:shadow-green-500/10`}
  >
    {/* Icon */}
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
      isDark ? 'bg-green-500/20' : 'bg-green-500/10'
    }`}>
      <span className="text-4xl">{service.icon}</span>
    </div>
    
    {/* Title */}
    <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {service.title}
    </h3>
    
    {/* Description */}
    <p className={`text-sm leading-relaxed mb-6 ${
      isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {service.description}
    </p>
    
    {/* Features List */}
    <ul className="space-y-2 mb-6">
      {service.features.slice(0, 3).map((feature, idx) => (
        <li key={idx} className={`flex items-start gap-2 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    {/* Learn More Button */}
    <a 
      href="#contact"
      className="inline-flex items-center gap-2 text-green-500 font-semibold hover:gap-3 transition-all duration-300 group"
    >
      Learn More
      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
);


  return (
    <div className={isDark ? 'dark' : ''} id='services'>
      <section className={`relative py-16 md:py-24 overflow-hidden ${
        isDark ? 'bg-slate-950' : 'bg-white'
      } transition-colors duration-500`}>
             {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#4ade80' : '#10b981'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-500 text-white text-sm font-medium">
                <span>Our Services</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500">Insurance</span>
                <br className="hidden sm:block" /> Solutions
              </h1>
              
              <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tailored protection plans designed for your unique needs and peace of mind.
              </p>
            </div>
          </div>

          {/* Life Insurance Section */}
          <div className="mb-16 md:mb-24">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 mb-8">
              <div className="flex items-center gap-4">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Life Insurance
                </h2>
                {/* <div className="h-1 flex-1 bg-gradient-to-r from-green-500 to-transparent rounded-full max-w-xs" /> */}
              </div>
             
            </div>

            <div 
              ref={lifeInsuranceRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4">
                {lifeInsurance.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`life-${index}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Non-Life Insurance Section */}
          <div className="mb-16">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 mb-8">
              <div className="flex items-center gap-4">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Non-Life Insurance
                </h2>
                {/* <div className="h-1 flex-1 bg-gradient-to-r from-green-500 to-transparent rounded-full max-w-xs" /> */}
              </div>

            </div>

            <div 
              ref={nonLifeInsuranceRef}
              className=" overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4">
                {nonLifeInsurance.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`non-life-${index}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
            <div className={`rounded-3xl p-6 sm:p-8 md:p-12 ${
              isDark 
                ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800' 
                : 'bg-gradient-to-r from-gray-50 to-gray-100 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                <div className="text-center lg:text-left">
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Need Custom Coverage?
                  </h3>
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Our experts will design a personalized insurance plan just for you.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                   <button 
    onClick={openForm}
    className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-green-500 hover:shadow-lg hover:shadow-green-500/25 text-white"
  >
    Get Free Quote
  </button>
               
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            />
            
                  <div 
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transform transition-all duration-300 scroll-container ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                } transition-colors`}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">{selectedService.icon}</span>
              <div>
                <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedService.title}
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedService.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            {/* <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-4 rounded-xl ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              {Object.entries(selectedService.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {value}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </div>
                </div>
              ))}
            </div> */}

            {/* Features */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isDark 
                        ? 'bg-gray-800/50 hover:bg-gray-800' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-green-500/20' : 'bg-green-500/10'
                    }`}>
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Overview
              </h3>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedService.details}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700/30">
              <a href='#contact' onClick={() => setSelectedService(null)} className="flex-1 px-6 py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-green-500 to-green-500 hover:shadow-lg hover:shadow-green-500/25 text-white">
                Get Quote Now
              </a>
              <button className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
              }`}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </section>
</div>
  );
};

export default ServicesSection;