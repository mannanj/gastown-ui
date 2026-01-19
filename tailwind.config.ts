import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gas Town Industrial Palette
        rust: {
          50: '#fef7f0',
          100: '#fdebd9',
          200: '#fad4b1',
          300: '#f6b57f',
          400: '#f18d4a',
          500: '#ed6d27',
          600: '#de531d',
          700: '#b83e19',
          800: '#93331c',
          900: '#772c1a',
          950: '#40130b',
        },
        steel: {
          50: '#f6f6f7',
          100: '#e2e3e5',
          200: '#c4c6cb',
          300: '#9fa2a9',
          400: '#7a7d87',
          500: '#60636c',
          600: '#4c4e56',
          700: '#3f4147',
          800: '#36373c',
          900: '#2d2e32',
          950: '#1a1b1d',
        },
        gunmetal: {
          50: '#f4f6f7',
          100: '#e3e7ea',
          200: '#cad2d7',
          300: '#a5b1ba',
          400: '#798996',
          500: '#5e6e7b',
          600: '#505c68',
          700: '#454e58',
          800: '#3d434b',
          900: '#2c3036',
          950: '#1c1f23',
        },
        ember: {
          DEFAULT: '#ff6b35',
          glow: '#ff8c5a',
          hot: '#ff4d1a',
        },
        warning: '#ffc107',
        danger: '#dc3545',
        success: '#28a745',
      },
      fontFamily: {
        display: ['var(--font-display)', 'monospace'],
        body: ['var(--font-body)', 'monospace'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        'hazard': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,107,53,0.1) 10px, rgba(255,107,53,0.1) 20px)',
        'grid-steel': 'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)',
      },
      boxShadow: {
        'ember': '0 0 20px rgba(255, 107, 53, 0.3)',
        'ember-lg': '0 0 40px rgba(255, 107, 53, 0.4)',
        'inner-ember': 'inset 0 0 20px rgba(255, 107, 53, 0.2)',
        'industrial': '4px 4px 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'pulse-ember': 'pulseEmber 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseEmber: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
