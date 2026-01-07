import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/logo.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormContext';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { openForm } = useForm();

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    window.dispatchEvent(new Event("themeChange"));
  };

  // Unified navigation handler
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      setIsMobileMenuOpen(false);
      return;
    }

    // If we're already on homepage, just scroll
    handleScrollToSection(sectionId);
  };

  // Separate scroll function
  const handleScrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navbarHeight = navRef.current?.offsetHeight || 64;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Effect to handle scrolling when arriving from another route
  useEffect(() => {
    // Check if we have a scroll target from route state
    if (location.state?.scrollTo && location.pathname === '/') {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        handleScrollToSection(location.state.scrollTo);
        // Clear the state to prevent re-scrolling on re-render
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Handle Get Free Quote button click
  const handleGetQuoteClick = (e) => {
    e.preventDefault();
    openForm();
    setIsMobileMenuOpen(false);
  };

  // GSAP-like scroll animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nav = navRef.current;

          if (!nav) return;

          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down - fade out
            nav.style.transform = 'translateY(-100%)';
            nav.style.opacity = '0';
          } else {
            // Scrolling up - fade in
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <nav
        ref={navRef}
        className={`${isDark ? 'bg-gray-900' : 'bg-green-900'} transition-all duration-500 fixed top-0 left-0 right-0 z-40 shadow-lg`}
        style={{ transform: 'translateY(0)', opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Contact Info */}
            <div className="flex items-center space-x-8">
              {/* Logo - Make it clickable to home */}
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={Logo} alt="Rewards Insurance Logo" />
                  <p>RC-208134</p>
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">Rewards</div>
                  <div className="text-xs">Insurance Brokers Limited</div>
                </div>
              </Link>
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={(e) => handleNavigation(e, 'home')}
                className="text-white hover:text-green-400 transition-colors text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={(e) => handleNavigation(e, 'about')}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                About
              </button>
              <button
                onClick={(e) => handleNavigation(e, 'services')}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Services
              </button>
              <Link
                to="/news"
                className="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Insights
              </Link>
              <button
                onClick={(e) => handleNavigation(e, 'contact')}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Contact
              </button>
            </div>

            {/* Right side - Theme Toggle & CTA Button */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-green-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Get Free Quote Button */}
              <button
                onClick={handleGetQuoteClick}
                className="hidden md:block bg-green-400 hover:bg-green-500 text-green-900 font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
              >
                Get Free Quote
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-green-800 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Full Screen */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden fixed inset-0 ${isDark ? 'bg-gray-900' : 'bg-green-900/70'
              } transform transition-transform duration-300 ease-out scrollbar-hide h-screen z-40
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                {/* Logo in mobile menu - clickable to home */}
                <Link
                  to="/"
                  className="flex items-center space-x-2"
                  onClick={() => {
                    if (location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                    <span className="text-green-900 font-bold text-xl">R</span>
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">Rewards</div>
                    <div className="text-xs text-gray-300">Insurance Brokers</div>
                  </div>
                </Link>

                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu items - centered */}
              <nav className="flex-1 flex flex-col justify-center space-y-6">
                <button
                  onClick={(e) => handleNavigation(e, 'home')}
                  className="text-white hover:text-green-400 transition-colors text-3xl font-semibold py-3 text-left"
                >
                  Home
                </button>
                <button
                  onClick={(e) => handleNavigation(e, 'about')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-3xl font-semibold py-3 text-left"
                >
                  About
                </button>
                <button
                  onClick={(e) => handleNavigation(e, 'services')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-3xl font-semibold py-3 text-left"
                >
                  Services
                </button>
                <Link
                  to="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-green-400 transition-colors text-3xl font-semibold py-3 text-left"
                >
                  Insights
                </Link>
                <button
                  onClick={(e) => handleNavigation(e, 'contact')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-3xl font-semibold py-3 text-left"
                >
                  Contact
                </button>
              </nav>

              {/* Bottom section */}
              <div className="space-y-4">
                <button
                  onClick={handleGetQuoteClick}
                  className="w-full bg-green-400 hover:bg-green-500 text-green-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg"
                >
                  Get Free Quote
                </button>

                {/* Contact info in mobile menu */}
                <div className="space-y-2 text-sm text-gray-300 pt-4 border-t border-green-800">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+234 903 300 6430</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">info@rewardsresourcebrokers.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;