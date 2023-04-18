/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-select/dist/index.esm.js",

    ],
    theme: {
        extend: {},
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        }
    },
    plugins: [
        require("daisyui"),

        plugin(function ({ addBase, theme }) {
            addBase({
                'h1': { fontSize: theme('fontSize.2xl') },
                'h2': { fontSize: theme('fontSize.xl') },
                'h3': { fontSize: theme('fontSize.lg') },
            })
        }),



    ],
    daisyui: {
        themes: [
            'light'
        ],
    },
}
