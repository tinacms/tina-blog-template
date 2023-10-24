/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['"Noto Serif JP"', 'sans'],
        'charter': ['"Charter"', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              background: '#0000FF',
            },
          },
        },
      },
    },
  },
}