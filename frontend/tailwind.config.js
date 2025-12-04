/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        //Inter font for navbar elements
        navbar: ["Inter", "sans-serif"]
      },
      keyframes: {
        //Water wave animation for the background
        water: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        water: 'water 20s ease-in-out infinite',
      },
    },    
  },
  plugins: [],
};
