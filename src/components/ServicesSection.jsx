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
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

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
                  ref.style.transform = 'translateY(0) scale(1)';
                }, 200 + index * 100);
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
      description: 'Protecting lives, securing futures with comprehensive coverage.',
      image: 'https://images.unsplash.com/photo-1587614295994-f0dfc3d7e8b9?w=1600&h=1200&fit=crop&q=90',
      category: 'personal',
      icon: '🛡️',
      features: ['Family Protection', 'Retirement Planning', 'Critical Illness'],
      color: 'from-purple-600 to-pink-500',
      stats: { clients: '50K+', satisfaction: '99%', payout: '$2B+' },
      details: 'Life insurance that adapts to your journey. From young professionals to retirees, our policies grow with you.'
    },
    {
      title: 'Motor Insurance',
      description: 'Road protection that moves with you, wherever you go.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&h=1200&fit=crop&q=90',
      category: 'vehicle',
      icon: '🚗',
      features: ['Accident Coverage', 'Theft Protection', 'Roadside Assistance'],
      color: 'from-blue-600 to-cyan-500',
      stats: { clients: '200K+', satisfaction: '97%', claims: '24h' },
      details: 'Comprehensive vehicle coverage with instant claims and 24/7 support. Drive with confidence.'
    },
    {
      title: 'Property Insurance',
      description: 'Shield your space from unexpected events.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=1200&fit=crop&q=90',
      category: 'property',
      icon: '🏠',
      features: ['Fire Damage', 'Natural Disasters', 'Theft Coverage'],
      color: 'from-amber-600 to-orange-500',
      stats: { clients: '75K+', satisfaction: '98%', response: '2h' },
      details: 'Protect your home or business with customizable coverage options for every scenario.'
    },
    {
      title: 'Marine Insurance',
      description: 'Navigate global trade with complete confidence.',
      image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&h=1200&fit=crop&q=90',
      category: 'commercial',
      icon: '🚢',
      features: ['Cargo Protection', 'Vessel Coverage', 'Transit Insurance'],
      color: 'from-emerald-600 to-teal-500',
      stats: { clients: '10K+', satisfaction: '96%', coverage: 'Global' },
      details: 'Global marine solutions for importers, exporters, and shipping companies.'
    },
    {
      title: 'Aviation Insurance',
      description: 'Fly secure with specialized aircraft protection.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=1200&fit=crop&q=90',
      category: 'commercial',
      icon: '✈️',
      features: ['Aircraft Hull', 'Liability Cover', 'Passenger Protection'],
      color: 'from-indigo-600 to-purple-500',
      stats: { clients: '5K+', satisfaction: '99%', partners: 'Global' },
      details: 'Specialized aviation insurance for private owners, airlines, and aviation businesses.'
    },
    {
      title: 'Engineering Insurance',
      description: 'Build with confidence, protect your projects.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&h=1200&fit=crop&q=90',
      category: 'commercial',
      icon: '⚙️',
      features: ['Project Coverage', 'Equipment Protection', 'Liability Shield'],
      color: 'from-sky-600 to-blue-500',
      stats: { clients: '15K+', satisfaction: '97%', projects: '10K+' },
      details: 'Comprehensive coverage for construction projects and engineering operations.'
    },
    {
      title: 'Professional Indemnity',
      description: 'Practice with protection, work with peace of mind.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=1200&fit=crop&q=90',
      category: 'professional',
      icon: '⚖️',
      features: ['Malpractice', 'Errors Coverage', 'Legal Protection'],
      color: 'from-green-600 to-emerald-500',
      stats: { clients: '25K+', satisfaction: '98%', defense: '24/7' },
      details: 'Protect your professional reputation with comprehensive liability coverage.'
    },
    {
      title: 'Pension & Benefits',
      description: 'Plan today, secure tomorrow with smart retirement solutions.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&h=1200&fit=crop&q=90',
      category: 'personal',
      icon: '💰',
      features: ['Retirement Plans', 'Employee Benefits', 'Wealth Management'],
      color: 'from-cyan-600 to-teal-500',
      stats: { clients: '100K+', satisfaction: '99%', growth: '15%+' },
      details: 'Comprehensive retirement and benefits planning for individuals and organizations.'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services', icon: '🌟' },
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'vehicle', label: 'Vehicle', icon: '🚘' },
    { id: 'property', label: 'Property', icon: '🏢' },
    { id: 'commercial', label: 'Commercial', icon: '🏭' },
    { id: 'professional', label: 'Professional', icon: '💼' }
  ];

  return (
    <div className={isDark ? 'dark' : ''} id='services'>
      <section 
        ref={sectionRef}
        className={`relative py-12 md:py-20 lg:py-28 overflow-hidden ${
          isDark ? 'bg-black' : 'bg-white'
        } transition-colors duration-500`}
      >
        {/* Minimal Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, ${isDark ? '#10b981' : '#059669'} 100%)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Minimal Header */}
          <div 
            ref={headerRef}
            className="text-center mb-16 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <div className="mb-8">
              <div className={`inline-block px-1 py-1 mb-8 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                <span className="text-emerald-500 text-xs font-semibold tracking-widest uppercase">
                  Our Expertise
                </span>
              </div>
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Protection<br/><span className="text-emerald-500">Visualized</span>
              </h1>
            </div>
            <p className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Each image tells a story of security, trust, and peace of mind.
            </p>
          </div>

          {/* Category Filter - Minimal */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? isDark
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-500 text-white'
                      : isDark
                        ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid - Image First Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                ref={(el) => (serviceRefs.current[index] = el)}
                className={`group relative aspect-square overflow-hidden rounded-3xl cursor-pointer opacity-0 transition-all duration-1000 ${
                  isDark 
                    ? 'bg-gray-900' 
                    : 'bg-white'
                }`}
                style={{ transform: 'translateY(50px) scale(0.95)' }}
                onClick={() => setSelectedService(service)}
              >
                {/* Hero Image - Full Bleed */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark 
                      ? 'from-black via-black/70 to-transparent' 
                      : 'from-white via-white/60 to-transparent'
                  } group-hover:opacity-80 transition-opacity duration-500`} />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                </div>

                {/* Floating Icon */}
                <div className={`absolute top-6 right-6 w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center text-2xl transition-all duration-500 ${
                  isDark 
                    ? 'bg-black/40 text-white group-hover:bg-black/60' 
                    : 'bg-white/40 text-gray-900 group-hover:bg-white/60'
                }`}>
                  {service.icon}
                </div>

                {/* Content Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-700 ${
                  isDark 
                    ? 'text-white' 
                    : 'text-gray-900'
                }`}>
                  {/* Stats Bar */}
                  <div className={`flex items-center justify-between mb-6 px-4 py-3 rounded-2xl backdrop-blur-sm ${
                    isDark ? 'bg-black/30' : 'bg-white/30'
                  }`}>
                    {Object.entries(service.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-lg font-bold">{value}</div>
                        <div className={`text-xs uppercase tracking-wider ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {service.title}
                    </h3>
                    <div className={`h-1 w-16 rounded-full ${
                      isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`} />
                    <p className="text-lg opacity-90">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Features */}
                  <div className={`mt-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${
                    isDark ? 'bg-black/20' : 'bg-white/20'
                  } backdrop-blur-sm p-4 rounded-2xl`}>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View More Button */}
                <div className={`absolute bottom-6 right-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 ${
                  isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                } text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2`}>
                  <span>Explore</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Edge Glow */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-3xl transition-all duration-500 pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-full ${
              isDark ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Need a custom solution?
              </span>
              <button className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isDark 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}>
                Contact Our Team
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {selectedService && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <div className="relative h-full overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Fullscreen Image */}
              <div className="relative h-screen">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent`} />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left Column */}
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl">
                            {selectedService.icon}
                          </div>
                          <div>
                            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-2">
                              {selectedService.title}
                            </h2>
                            <div className="h-1 w-24 bg-emerald-400 rounded-full" />
                          </div>
                        </div>
                        
                        <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                          {selectedService.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                          {selectedService.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className="px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
                        <div className={`p-8 rounded-3xl backdrop-blur-sm ${
                          isDark ? 'bg-white/10' : 'bg-black/20'
                        }`}>
                          <h3 className="text-2xl font-bold text-white mb-6">Coverage Details</h3>
                          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            {selectedService.details}
                          </p>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            {Object.entries(selectedService.stats).map(([key, value], idx) => (
                              <div key={idx} className="text-center p-4 rounded-2xl bg-white/5">
                                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* CTA Buttons */}
                          <div className="space-y-4">
                            <button className={`w-full py-4 rounded-xl font-semibold bg-gradient-to-r ${selectedService.color} text-white hover:shadow-2xl transition-all`}>
                              Get Instant Quote
                            </button>
                            <button className="w-full py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all">
                              Schedule Consultation
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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