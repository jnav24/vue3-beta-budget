module.exports = {
	purge: ['./src/**/*.vue'],
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
			},
		},
	},
	variants: {
		backgroundColor: ['hover', 'active', 'responsive', 'even'],
		borderColor: ['hover', 'active', 'focus'],
	},
	plugins: [],
};
