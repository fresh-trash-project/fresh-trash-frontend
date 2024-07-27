/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      aspectRatio: {
        soWide: ' 21/6',
        wide: '13/4',
        medium: '4/2',
      },
      colors: {
        'purple-soft': '#8474a1',
        'purple-lilac': '#ccabd8',
        'purple-dpurple': '#9b59b6',

        'green-tiffany': '#6ec6ca',
        'green-cyan': '#08979d',
        'green-current': '#055b5c',
        'green-brunswick': '#275a53',
        'green-harlequin': '#55f0e3',
        'green-dgreen': '#2ecc71',
        'green-aura': '#1abc9c',
        'green-mint': '#04d0d9',
        'green-light': '#9acb34',
        'green-olive': '#97a898',
        'green-poly': '#2f5031',
        'green-paleaqua': '#cde5d0',

        'blue-dblue': '#3498db',
        'blue-grey': '#34495e',

        'yellow-saffron': '#f8c765',
        'yellow-naples': '#f7d865',
        'yellow-deep': '#ffbf00',
        'red-cinnabar': '#e3492b',
        'red-tomato': '#fc6042',

        'grey-dgrey': '#34495e',
        'grey-dark': '#353e4a',
        'grey-box': '#d9d9d9',

        'white-ivory': '#fbf8ef',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#275a53',
          '--tab-bg': '#275a53',
          '--tab-border-color': '#275a53',
        },
      },
    ],
  },
};
