module.exports = {
	purge: ['./src/**/*.vue'],
	theme: {
		extend: {
			colors: {
				primary: '#45ADA8',
				'dark-primary': '#195956',
				secondary: '#EFC958',
			},
		},
	},
	variants: {
		backgroundColor: ['hover', 'active'],
		borderColor: ['hover', 'active', 'focus'],
	},
	plugins: [],
};
