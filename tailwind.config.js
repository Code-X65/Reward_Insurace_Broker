/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // Primary Brand Color - Lime Green
                primary: {
                    50: '#f5fce8',
                    100: '#e8f7c7',
                    200: '#d4f091',
                    300: '#b9e551',
                    400: '#9dc63f', // Main brand color
                    500: '#82a834',
                    600: '#658527',
                    700: '#4d6520',
                    800: '#3f511d',
                    900: '#36451c',
                    950: '#1b250b',
                },
                // Secondary Brand Color - Royal Blue
                secondary: {
                    50: '#e6f2ff',
                    100: '#cce5ff',
                    200: '#99cbff',
                    300: '#66b0ff',
                    400: '#3396ff',
                    500: '#0055a4', // Main brand color
                    600: '#004489',
                    700: '#00336e',
                    800: '#002252',
                    900: '#001137',
                    950: '#000a1f',
                },
                // Neutral colors for light mode
                light: {
                    bg: '#ffffff',
                    surface: '#f8f9fa',
                    border: '#e9ecef',
                    text: {
                        primary: '#212529',
                        secondary: '#6c757d',
                        muted: '#adb5bd',
                    }
                },
                // Neutral colors for dark mode
                dark: {
                    bg: '#0a0e13',
                    surface: '#151a21',
                    border: '#1f2937',
                    text: {
                        primary: '#f8f9fa',
                        secondary: '#adb5bd',
                        muted: '#6c757d',
                    }
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
                nunito: ['Nunito', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #9dc63f 0%, #82a834 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #0055a4 0%, #004489 100%)',
                'gradient-brand': 'linear-gradient(135deg, #9dc63f 0%, #0055a4 100%)',
                'gradient-brand-reverse': 'linear-gradient(135deg, #0055a4 0%, #9dc63f 100%)',
            },
            boxShadow: {
                'primary': '0 4px 14px 0 rgba(157, 198, 63, 0.39)',
                'secondary': '0 4px 14px 0 rgba(0, 85, 164, 0.39)',
                'primary-lg': '0 10px 40px 0 rgba(157, 198, 63, 0.3)',
                'secondary-lg': '0 10px 40px 0 rgba(0, 85, 164, 0.3)',
            }
        },
    },
    plugins: [],
}
