import React, { useState, useEffect, useRef } from 'react';

const IndustriesSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const industryRefs = useRef([]);
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

            industryRefs.current.forEach((ref, index) => {
              if (ref) {
                setTimeout(() => {
                  ref.style.opacity = '1';
                  ref.style.transform = 'translateY(0)';
                }, 300 + index * 120);
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

  const industries = [
    {
      title: 'Government & Public Sector',
      description: 'Comprehensive coverage for government institutions and public entities.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-green-500 to-cyan-600'
    },
    {
      title: 'Food & Beverage',
      description: 'Protecting the F&B industry supply chain and operations.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Food & Beverage',
      description: 'Protecting the F&B industry supply chain and operations.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Manufacturing',
      description: 'Industrial risk management solutions for manufacturers.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Logistics & Transport',
      description: 'Fleet and cargo protection solutions.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Retail & Commerce',
      description: 'Business interruption coverage for retail operations.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Healthcare',
      description: 'Medical malpractice and facility coverage.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Education',
      description: 'Institution and student protection coverage.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''} id='industries'>
      <section 
        ref={sectionRef}
        className={`relative py-8 md:py-10 lg:py-10 overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } transition-colors duration-300`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? '#14b8a6' : '#14b8a6'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center mb-12 md:mb-16 lg:mb-20 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <div className="inline-block mb-4">
              <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
                Industries We Serve
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Specialized Solutions for <span className="text-green-400">Every Sector</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              We understand that different industries have unique risks. Our expertise spans across multiple sectors.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                ref={(el) => (industryRefs.current[index] = el)}
                className={`group relative p-8 rounded-2xl transition-all duration-700 opacity-0 hover:scale-105 cursor-pointer overflow-hidden ${
                  isDark 
                    ? 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-gray-50 hover:bg-white border border-gray-200'
                } shadow-lg hover:shadow-2xl`}
                style={{ transform: 'translateY(50px)' }}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${industry.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {industry.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  } group-hover:text-green-400 transition-colors`}>
                    {industry.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {industry.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesSection;