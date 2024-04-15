/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],
};
