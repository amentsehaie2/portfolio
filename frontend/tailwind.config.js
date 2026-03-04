/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0099ff',       // Vibrant electric blue
        secondary: '#00d4ff',     // Bright cyan
        accent: '#0066cc',        // Deep blue
        dark: '#0d0d0d',          // Rich dark charcoal
        'dark-lighter': '#1a1a1a' // For subtle contrast
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}
