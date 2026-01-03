import React, { useState, useEffect } from 'react';

const LegalLayout = ({ title, children, lastUpdated }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : false;
    });

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

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                }`}>
                <div className="max-w-4xl mx-auto">
                    {/* Decorative blobs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-green-900' : 'bg-green-100'}`} />
                        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`} />
                    </div>

                    <div className={`relative z-10 rounded-3xl p-8 md:p-12 shadow-2xl ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-100'
                        } backdrop-blur-xl`}>

                        <header className="mb-10 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-500">{title}</h1>
                            {lastUpdated && (
                                <p className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-black'}`}>
                                    Last Updated: {lastUpdated}
                                </p>
                            )}
                            <div className="mt-6 h-1 w-20 bg-green-500 rounded-full mx-auto md:mx-0"></div>
                        </header>

                        <div className={`space-y-8 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-black font-medium'}`}>
                            {children}
                        </div>

                        <footer className="mt-16 pt-8 border-t border-gray-700/20 text-center">
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-black font-semibold'}`}>
                                © 2025 Rewards Insurance Brokers Limited. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalLayout;
