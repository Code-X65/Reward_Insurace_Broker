import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';

const CTASection = () => {
   const { openForm } = useForm(); 
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const sectionRef = useRef(null);
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
          }
        });
      },
      {
        threshold: 0.2
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

  return (
    <div className={isDark ? 'dark' : ''}>
      <section 
        ref={sectionRef}
        className={`relative py-20 md:py-32 overflow-hidden ${
          isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900'
        } transition-colors duration-300`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-green-400/20" />
        <div className="absolute bottom-10 left-10 w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-yellow-400/20" />
        
        {/* Large Shield Icons */}
        <div className="absolute top-20 right-20 opacity-10">
          <svg className="w-48 h-48 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            
            {/* Shield Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-green-400 shadow-2xl">
              <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              You Need an Insurance Plan{' '}
              <span className="text-green-400">That Works!</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Don't leave your future to chance. Our expert advisors are ready to help you find the perfect coverage for your unique needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
    onClick={openForm}
    className="group w-full sm:w-auto px-8 py-4 bg-green-400 hover:bg-green-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
  >
    <span>Get Free Consultation</span>
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </button>

              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 hover:border-green-400 text-white hover:text-green-400 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call: +234 803 390 6410</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;