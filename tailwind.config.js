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
