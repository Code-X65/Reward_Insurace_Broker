import React, { useState, useEffect, useRef, useCallback } from 'react';
import img01 from '../assets/partners/vertias.png'
import img02 from '../assets/partners/img02.webp'
import img03 from '../assets/partners/img03.png'
import img04 from '../assets/partners/img04.png'
import img05 from '../assets/partners/img05.png'
import img06 from '../assets/partners/img06.png'
import img07 from '../assets/partners/img07.png'
import img08 from '../assets/partners/img08.png'
import img09 from '../assets/partners/img09.png'
import img10 from '../assets/partners/img10.png'
import img11 from '../assets/partners/img11.png'
import img12 from '../assets/partners/img12.png'
import img13 from '../assets/partners/img13.png'
import img14 from '../assets/partners/img14.png'
import img15 from '../assets/partners/img15.png'
import img16 from '../assets/partners/img16.png'
import img17 from '../assets/partners/img17.png'
import img18 from '../assets/partners/img18.png'
import img19 from '../assets/partners/img19.png'

const ClientsPartnersSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Refs for carousel control
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);

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

            if (ctaRef.current) {
              setTimeout(() => {
                ctaRef.current.style.opacity = '1';
                ctaRef.current.style.transform = 'translateY(0)';
              }, 800);
            }
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

  // Insurance partner logos
  const partners = [
    { name: '', image: img01 },
    { name: '', image: img02 },
    { name: '', image: img03 },
    { name: '', image: img04 },
    { name: '', image: img05 },
    { name: '', image: img06 },
    { name: '', image: img07 },
    { name: '', image: img08 },
    { name: '', image: img09 },
    { name: '', image: img10 },
    { name: '', image: img11 },
    { name: '', image: img12 },
    { name: '', image: img13 },
    { name: '', image: img14 },
    { name: '', image: img15 },
    { name: '', image: img16 },
    { name: '', image: img17 },
    { name: '', image: img18 },
    { name: '', image: img19 },
  ];

  // Create duplicated array for seamless infinite effect
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Smooth animation using requestAnimationFrame
  const animateCarousel = useCallback(() => {
    if (!carouselRef.current || isPausedRef.current) {
      animationRef.current = requestAnimationFrame(animateCarousel);
      return;
    }

    const carousel = carouselRef.current;
    const scrollSpeed = 0.5; // pixels per frame

    carousel.scrollLeft += scrollSpeed;

    // Reset to create infinite effect
    if (carousel.scrollLeft >= carousel.scrollWidth / 3) {
      carousel.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animateCarousel);
  }, []);

  // Start animation on mount and clean up
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateCarousel);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateCarousel]);

  // Handle hover events
  const handleMouseEnter = () => {
    isPausedRef.current = true;
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'auto';
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <section
        ref={sectionRef}
        className={`relative py-10 md:py-10 lg:py-14 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-gray-50'
          } transition-colors duration-300`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative Divider */}
          <div className="relative mb-16 md:mb-24">
            <div className={`h-px w-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`p-3 rounded-full ${isDark ? 'bg-gray-900 border-2 border-gray-800' : 'bg-gray-50 border-2 border-gray-300'
                }`}>
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Partners Carousel */}
          <div>
            <div className="text-center mb-8">
              <h3 className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-black'
                }`}>
                INSURANCE PARTNERS
              </h3>
            </div>

            {/* Improved Carousel Container */}
            <div className="relative">
              {/* Gradient overlays for smooth edges */}


              {/* Carousel with improved scrolling */}
              <div
                ref={carouselRef}
                className="flex overflow-x-hidden scrollbar-hide py-8"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <div className="flex gap-8">
                  {duplicatedPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-4 group transition-all duration-300 scale-120 hover:scale-125"
                      style={{ width: 'clamp(140px, 15vw, 180px)' }}
                    >
                      <div className={`relative h-28 sm:h-32 overflow-hidden transition-all duration-300 rounded-xl`}>
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="w-full h-full object-contain p-1 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          loading="lazy"
                          draggable="false"
                        />
                        {/* Hover effect overlay */}

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Custom Scrollbar Hide */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ClientsPartnersSection;