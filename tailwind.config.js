/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fd',
          100: '#b3e8fa',
          200: '#80d9f7',
          300: '#4dcaf4',
          400: '#1abbf1',
          500: '#039edb', // Main blue
          600: '#0280af',
          700: '#026183',
          800: '#014157',
          900: '#01232b',
        },
        secondary: {
          50: '#f0f9ec',
          100: '#d4eed1',
          200: '#b8e3b6',
          300: '#9cd89b',
          400: '#80cd80',
          500: '#71bf44', // Main green
          600: '#5a9936',
          700: '#437328',
          800: '#2c4d1a',
          900: '#15270c',
        },
        accent: {
          DEFAULT: '#039edb',
          light: '#71bf44',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(12deg)' },
          '50%': { transform: 'translateY(-20px) rotate(12deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-12deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-12deg)' },
        },
      },
    },
  },
  plugins: [],
}

