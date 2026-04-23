import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {

            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            /* ---------------- Banner Animations ---------------- */

            keyframes: {

                /* Title animation (top-left to bottom) */
                titleMove: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(-40px,-40px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0,0)'
                    },
                },

                /* Subtitle animation (left to position) */
                subtitleMove: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-60px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)'
                    },
                },
                /* Brand scroll animation */
                scroll: {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(-50%)'
                    },
                },

            },

            animation: {

                titleMove: 'titleMove 0.9s ease-out',

                subtitleMove: 'subtitleMove 1.2s ease-out',

                /* Brand scroll */
                scroll: 'scroll 25s linear infinite',

            },

        },
    },

    plugins: [
        forms,
    ],
};
