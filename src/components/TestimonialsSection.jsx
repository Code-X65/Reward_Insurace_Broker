import React, { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const testimonials = [
    {
      quote: "Rewards Insurance Brokers delivers exceptional risk transfer solutions. Their team went above and beyond to ensure we had the perfect coverage for our organization.",
      name: "Victoria Porter",
      position: "Finance Director, Zenith PVH Ltd",
      rating: 5
    },
    {
      quote: "Outstanding service and professionalism. They took the time to understand our unique needs and provided tailored solutions that truly protect our business.",
      name: "Michael Adebayo",
      position: "CEO, TransGlobal Logistics",
      rating: 5
    },
    {
      quote: "The expertise and dedication shown by Rewards Insurance is unmatched. They've been instrumental in protecting our assets and ensuring business continuity.",
      name: "Sarah Johnson",
      position: "Risk Manager, Delta Manufacturing",
      rating: 5
    },
    {
      quote: "A truly reliable partner in insurance. Their prompt response and comprehensive coverage options have given us peace of mind in our operations.",
      name: "Oluwaseun Okonkwo",
      position: "Operations Director, Prime Industries",
      rating: 5
    }
  ];

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <section
        ref={sectionRef}
        className={`relative py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'
          } transition-colors duration-300`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${isDark ? '#14b8a6' : '#14b8a6'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#14b8a6' : '#14b8a6'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <div className="inline-block mb-4">
              <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
                Testimonials
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              What Our <span className="text-green-400">Clients Say</span>
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <div className={`relative rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl ${isDark
              ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50'
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              } backdrop-blur-sm`}>

              {/* Quote Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                <p className={`px-10 text-lg sm:text-xl md:text-2xl text-center leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-black font-medium'
                  } font-light italic`}>
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="text-center">
                  <h4 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-black font-semibold'
                    }`}>
                    {testimonials[currentIndex].position}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                    } shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                    } shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-12 h-3 bg-green-400'
                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                    } disabled:cursor-not-allowed`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsSection;