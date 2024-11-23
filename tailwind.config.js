/** @type {import('tailwindcss').Config} */
export default {
    content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
        extend: {
          colors: {
            lightTeal: '#DCF2F1',
            teal: '#7FC7D9',
            secondary: '#365486',
            primary: '#0F1035',
            danger: '#AF1740',
          },
    },
  },
  plugins: [],
}

