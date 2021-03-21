module.exports = {
	purge: {
		content: ['./src/**/*.vue'],
		options: {
			safelist: [
				'grid-cols-4',
				'sm:grid-cols-4',
				'md:grid-cols-4',
				'grid-cols-5',
				'sm:grid-cols-5',
				'md:grid-cols-5',
				'grid-cols-6',
				'sm:grid-cols-6',
				'md:grid-cols-6',
				'grid-cols-7',
				'sm:grid-cols-7',
				'md:grid-cols-7',
				'grid-cols-9',
				'sm:grid-cols-9',
				'md:grid-cols-9',
			],
		},
	},
	theme: {
		fontFamily: {
			body: ['Nunito', 'sans-serif'],
			header: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
		},
		extend: {
			colors: {
				danger: '#C62828',
				'dark-danger': '#4B0F0F',
				'dark-primary': '#264653',
				'dark-secondary': '#A88D3E',
				primary: '#45ADA8',
				secondary: '#EFC958',
			},
			minHeight: {
				'64': '16rem',
				'256': '64rem',
			},
			maxHeight: {
				'48': '12rem',
			},
			maxWidth: {
				'32': '8rem',
			},
			opacity: {
				'85': '0.85',
				'95': '0.95',
			},
			width: {
				'100': '25rem',
				'150': '38rem',
				'200': '50rem',
				'250': '63rem',
				'300': '75rem',
			},
			zIndex: {
				'100': 100,
			},
		},
	},
	variants: {
		backgroundColor: ['hover', 'active', 'responsive', 'even'],
		borderColor: ['hover', 'active', 'focus'],
	},
	plugins: [],
};
