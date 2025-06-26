module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',      // Indigo
        secondary: '#f59e0b',    // Amber
        accent: '#ec4899',       // Pink
        bg: '#fef9c3',           // Light Yellow
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};