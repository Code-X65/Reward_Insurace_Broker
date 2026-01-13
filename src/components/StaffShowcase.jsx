import React, { useState, useEffect, useRef } from 'react';
import staffImage from '../assets/staff_of_the_year.jpg';
import { Award, Star } from 'lucide-react';

const StaffShowcase = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`py-16 md:py-24 ${isDark ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300 relative overflow-hidden`}
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isDark ? 'bg-green-900' : 'bg-green-200'}`} />
                <div className={`absolute top-1/2 -right-24 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-900' : 'bg-blue-200'}`} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 space-y-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                        <Award className="w-4 h-4" />
                        <span>Excellence in Service</span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Celebrating Our <span className="text-green-500">Star Performer</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We recognize and celebrate the exceptional dedication, passion, and performance of our team members.
                    </p>
                </div>

                <div className={`flex justify-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className={`relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl group ${isDark ? 'shadow-black/50 border border-gray-800' : 'shadow-xl border border-gray-100'}`}>

                        {/* Decorative shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                        <img
                            src={staffImage}
                            alt="Staff of the Year 2025"
                            className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-[1.02]"
                        />

                        {/* Optional Caption Overlay if needed, currently leaving clean as image likely has text */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaffShowcase;
