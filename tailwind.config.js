/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* white-10 */
        input: "var(--color-input)", /* indigo-950 */
        ring: "var(--color-ring)", /* cyan-400 */
        background: "var(--color-background)", /* deep-indigo-950 */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* cyan-400 */
          foreground: "var(--color-primary-foreground)", /* deep-indigo-950 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* purple-600 */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* coral-500 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* indigo-900 */
          foreground: "var(--color-muted-foreground)", /* lavender-300 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* magenta-500 */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* indigo-950 */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* indigo-950 */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* mint-400 */
          foreground: "var(--color-success-foreground)", /* deep-indigo-950 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-400 */
          foreground: "var(--color-warning-foreground)", /* deep-indigo-950 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* coral-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: {
          DEFAULT: "var(--color-surface)", /* indigo-950 */
          foreground: "var(--color-surface-foreground)", /* white */
        },
        "text-primary": "var(--color-text-primary)", /* white */
        "text-secondary": "var(--color-text-secondary)", /* lavender-300 */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'], /* futuristic-headings */
        body: ['Inter', 'sans-serif'], /* readable-body-text */
        caption: ['Poppins', 'sans-serif'], /* friendly-captions */
        mono: ['JetBrains Mono', 'monospace'], /* technical-data */
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
      },
      boxShadow: {
        'glow-primary': 'var(--glow-primary)',
        'glow-secondary': 'var(--glow-secondary)',
        'glow-accent': 'var(--glow-accent)',
        'glow-success': 'var(--glow-success)',
        'glow-warning': 'var(--glow-warning)',
        'glow-error': 'var(--glow-error)',
        'glow-subtle': 'var(--glow-subtle) rgba(0, 255, 255, 0.1)',
        'glow-medium': 'var(--glow-medium) rgba(0, 255, 255, 0.3)',
        'glow-strong': 'var(--glow-strong) rgba(0, 255, 255, 0.5)',
        'cosmic': '0 0 50px rgba(0, 255, 255, 0.2), 0 0 100px rgba(138, 43, 226, 0.1)',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'cosmic-spin': 'spin 30s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'cosmic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}