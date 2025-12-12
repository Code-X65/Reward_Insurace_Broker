import React, { useState, useEffect, useRef } from 'react';

const ClientsPartnersSection = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
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

  // Client company logos (using professional business/corporate images)
  const clients = [
    { name: 'First Bank Nigeria', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { name: 'Dangote Group', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80' },
    { name: 'MTN Nigeria', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80' },
    { name: 'Access Bank', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
    { name: 'Julius Berger', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
    { name: 'Nigerian Breweries', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80' },
    { name: 'Zenith Bank', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { name: 'Nestle Nigeria', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80' },
  ];

  // Insurance partner logos
  const partners = [
    { name: 'AXA Mansard', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80' },
    { name: 'Leadway Assurance', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80' },
    { name: 'AIICO Insurance', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80' },
    { name: 'Custodian Insurance', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
    { name: 'NEM Insurance', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
    { name: 'Cornerstone Insurance', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { name: 'Continental Re', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80' },
    { name: 'Africa Re', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80' },
    { name: 'Sovereign Trust', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
    { name: 'Mutual Benefits', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80' },
  ];

  // Duplicate arrays for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className={isDark ? 'dark' : ''}>
      <section 
        ref={sectionRef}
        className={`relative py-4 md:py-10 lg:py-4 overflow-hidden ${
          isDark ? 'bg-slate-950' : 'bg-gray-50'
        } transition-colors duration-300`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center md-4 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <div className="inline-block mb-4">
              <span className="text-green-500 text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-green-500/10">
                Trusted Partnerships
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Trusted by Industry <span className="text-green-500">Leaders</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              We partner with Nigeria's most respected organizations and insurance providers to deliver exceptional coverage and service.
            </p>
          </div>

          {/* Clients Carousel */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-8">
              <h3 className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                OUR VALUED CLIENTS
              </h3>
            </div>

            {/* Scrolling Container */}
            <div className="relative overflow-hidden py-8">
              {/* Gradient Overlays */}
              <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-900 to-transparent' 
                  : 'bg-gradient-to-r from-gray-50 to-transparent'
              }`} />
              <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                isDark 
                  ? 'bg-gradient-to-l from-gray-900 to-transparent' 
                  : 'bg-gradient-to-l from-gray-50 to-transparent'
              }`} />

              {/* Sliding Track */}
              <div className="flex animate-[scroll_30s_linear_infinite] hover:pause">
                {duplicatedClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-4 group"
                    style={{ width: '200px' }}
                  >
                    <div className={`relative h-28 rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white border border-gray-200 shadow-sm'
                    } group-hover:scale-105 group-hover:shadow-xl`}>
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <p className="text-white text-sm font-semibold truncate w-full">
                          {client.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="relative mb-16 md:mb-24">
            <div className={`h-px w-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`p-3 rounded-full ${
                isDark ? 'bg-gray-900 border-2 border-gray-800' : 'bg-gray-50 border-2 border-gray-300'
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
              <h3 className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                INSURANCE PARTNERS
              </h3>
            </div>

            {/* Scrolling Container - Reverse Direction */}
            <div className="relative overflow-hidden py-8">
              {/* Gradient Overlays */}
              <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-900 to-transparent' 
                  : 'bg-gradient-to-r from-gray-50 to-transparent'
              }`} />
              <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                isDark 
                  ? 'bg-gradient-to-l from-gray-900 to-transparent' 
                  : 'bg-gradient-to-l from-gray-50 to-transparent'
              }`} />

              {/* Sliding Track - Reverse */}
              <div className="flex animate-[scroll-reverse_35s_linear_infinite] hover:pause">
                {duplicatedPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-4 group"
                    style={{ width: '180px' }}
                  >
                    <div className={`relative h-32 rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white border border-gray-200 shadow-sm'
                    } group-hover:scale-105 group-hover:shadow-xl`}>
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end p-4">
                        <p className="text-white text-xs font-semibold truncate w-full">
                          {partner.name}
                        </p>
                      </div>
                      {/* Badge */}
                      <div className="absolute top-2 right-2">
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                          PARTNER
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-reverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .pause {
            animation-play-state: paused;
          }

          .hover\\:pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </div>
  );
};

export default ClientsPartnersSection;