/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with a 'dark' class
  content: ['./src/**/*.{html,js,svelte,ts}'], // Adjust to your file paths
  theme: {
    extend: {
      colors: {
        blueish: {
          dark: '#1e3a8a', // Custom dark blue
          gradientStart: '#111827', // Dark background start
          gradientEnd: '#1e3a8a', // Blueish gradient end
        },
      },
      backgroundImage: {
        'harrington': "url('/harrington.jpg')",
      },
    },
  },
  plugins: [],
};