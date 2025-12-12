import React, { useState, useEffect, useRef } from 'react';

const ServicesSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const serviceRefs = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            if (headerRef.current) {
              setTimeout(() => {
                headerRef.current.style.opacity = '1';
                headerRef.current.style.transform = 'translateY(0)';
              }, 100);
            }

            serviceRefs.current.forEach((ref, index) => {
              if (ref) {
                setTimeout(() => {
                  ref.style.opacity = '1';
                  ref.style.transform = 'translateY(0)';
                }, 300 + index * 150);
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const services = [
    {
      title: 'Life Insurance',
      description: 'Protecting the coverage you need including Group Life Annuities, Individual Life, and Personal Accident protection.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: ['Group Life Assurance', 'Individual Life', 'Personal Accident'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Motor Insurance',
      description: 'Complete vehicle protection from comprehensive coverage to third-party liability insurance.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      features: ['Comprehensive Cover', 'Third Party', 'Fleet Insurance'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Property Insurance',
      description: 'Safeguard your assets with burglary and all-risk coverage for commercial and residential properties.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      features: ['Fire & Perils', 'Burglary', 'All Risk'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Marine Insurance',
      description: 'Comprehensive insurance for cargo and hull insurance for goods in transit across sea routes.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      features: ['Cargo Insurance', 'Hull Insurance', 'Freight Coverage'],
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Aviation Insurance',
      description: 'Specialized coverage for aircraft aviation liability, and passenger cover.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      features: ['Aircraft Hull', 'Aviation Liability', 'Passenger Cover'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Engineering Insurance',
      description: 'Comprehensive solutions for contractors, machinery, and engineering projects.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['Contractors All Risk', 'Machinery Breakdown', 'Equipment'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Professional Indemnity',
      description: 'Protection for professionals against claims arising from negligent acts or errors.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Professional Liability', 'Directors & Officers', 'E&O Insurance'],
      color: 'from-green-500 to-green-500'
    },
    {
      title: 'Pension & Benefits',
      description: 'Retirement planning and employee benefit schemes for organizations of all sizes.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ['Pension Schemes', 'Death Benefits', 'Retirement Plans'],
      color: 'from-cyan-500 to-green-500'
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''} id='services'>
      <section 
        ref={sectionRef}
        className={`relative py-8 md:py-8 lg:py-8 overflow-hidden ${
          isDark ? 'bg-slate-950' : 'bg-gray-50'
        } transition-colors duration-300`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${isDark ? '#14b8a6' : '#14b8a6'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#14b8a6' : '#14b8a6'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center mb-8 md:mb-8 lg:mb-8 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <div className="inline-block mb-4">
              <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
                Our Services
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              What We <span className="text-green-400">Offer</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Comprehensive insurance solutions tailored to protect you, your family, and your business from life's uncertainties. Click any service to learn more.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (serviceRefs.current[index] = el)}
                className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-700 opacity-0 hover:scale-105 cursor-pointer ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                } shadow-lg hover:shadow-2xl`}
                style={{ transform: 'translateY(50px)' }}
              >
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
              </h3>

                {/* Description */}
                <p className={`text-sm mb-6 leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <button className="flex items-center space-x-2 text-green-400 hover:text-green-500 font-semibold transition-colors group-hover:gap-3">
                  <span>Learn More</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;