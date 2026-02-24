/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Futuristic Dark Theme Palette
				dark: '#030014',       // Deep space blue/black background
				'dark-card': '#0f0c29', // Slightly lighter card background
				primary: '#7000ff',    // Neon Purple
				secondary: '#00c6ff',  // Cyan/Blue
				accent: '#ff0055',     // Hot Pink/Red for highlights
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Orbitron', 'sans-serif'], // For headers
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
			},
			animation: {
				'spin-slow': 'spin 15s linear infinite',
				'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' },
				}
			}
		},
	},
	plugins: [],
}
