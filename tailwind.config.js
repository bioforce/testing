const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        extend: {},
        colors: {
            ...colors,
            primary: colors.indigo
        },
        inset: {
            '0': 0,
            auto: 'auto',
            '1/2': '50%',
            '1/10': '10%',
        }
    },
    variants: {},
    plugins: [],
}
