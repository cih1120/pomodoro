/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                font: 'hsl(var(--font))',
                primary: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    dark: 'hsl(var(--primary-dark) / <alpha-value>)',
                    light: 'hsl(var(--primary-light))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    dark: 'hsl(var(--secondary-dark))',
                    light: 'hsl(var(--secondary-light))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    dark: 'hsl(var(--muted-dark))',
                    light: 'hsl(var(--muted-light))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    light: 'hsl(var(--accent-light))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            boxShadow: {
                solid: '0px 4px 0px 0px rgba(0, 0, 0, 0.08) inset, 6px 0px 0px 0px rgba(0, 0, 0, 0.25);',
            },
            fontFamily: {
                EBGaramond: ['EB Garamond', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
