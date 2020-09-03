module.exports = {
	purge: ['./src/**/*.vue'],
	theme: {
		fontFamily: {
			body: ['Nunito', 'sans-serif'],
			header: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: '#45ADA8',
				danger: '#C62828',
				'dark-primary': '#195956',
				secondary: '#EFC958',
			},
			width: {
				'100': '25rem',
			},
		},
	},
	variants: {
		backgroundColor: ['hover', 'active', 'responsive'],
		borderColor: ['hover', 'active', 'focus'],
	},
	plugins: [],
};
