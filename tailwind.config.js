/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007F8C',
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#007F8C',
          600: '#00697A',
          700: '#00545E',
          800: '#003F46',
          900: '#002B30',
        },
        accent: {
          DEFAULT: '#FF7A2F',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF7A2F',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        background: {
          DEFAULT: '#FAF8F6',
          50: '#FFFFFF',
          100: '#FAF8F6',
          200: '#F0EDE8',
          300: '#E6E1D9',
          400: '#DCD5CA',
          500: '#D2C9BB',
          600: '#C8BDAC',
          700: '#BEB19D',
          800: '#B4A58E',
          900: '#AA997F',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};