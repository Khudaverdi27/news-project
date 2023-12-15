/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: '#0768B5',
        skyBlue: '#2F9FF8',
        amberBlack: '#072D4B'
      },
      borderRadius: {
        theme: '4px'
      },
      boxShadow: {
        theme: '0px 2px 20px 0px rgba(0, 0, 0, 0.04)',
      }

    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}

