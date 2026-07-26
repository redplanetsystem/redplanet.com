/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        marsRed: {
          DEFAULT: "#ff3300",
          glow: "#ff330088",
          dark: "#cc2900",
          bright: "#ff5533",
        },
        deepSpace: {
          DEFAULT: "#05050a",
          light: "#0f0f1a",
          card: "#0d0d16",
        },
        obsidian: {
          DEFAULT: "#0b0b14",
          surface: "#141422",
          border: "#1f1f33",
        },
        neonCyan: {
          DEFAULT: "#00f0ff",
          glow: "#00f0ff88",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-red': '0 0 25px rgba(255, 51, 0, 0.35)',
        'neon-red-lg': '0 0 50px rgba(255, 51, 0, 0.5)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'card-hover': '0 20px 40px -15px rgba(255, 51, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mars-glow': 'linear-gradient(180deg, rgba(255, 51, 0, 0.15) 0%, rgba(5, 5, 10, 0) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    // Custom utility plugin for advanced scrollbar and glass styling
    function ({ addUtilities }) {
      const newUtilities = {
        '.glass-panel': {
          background: 'rgba(13, 13, 22, 0.7)',
          backdropFilter: 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          border: '1px solid rgba(255, 51, 0, 0.15)',
        },
        '.glass-panel-hover': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.glass-panel-hover:hover': {
          background: 'rgba(20, 20, 34, 0.85)',
          borderColor: 'rgba(255, 51, 0, 0.4)',
          boxShadow: '0 0 30px rgba(255, 51, 0, 0.2)',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}