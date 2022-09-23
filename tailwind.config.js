module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
			},
			scale: {
				101: '1.01',
			},
		},
	},
	customForms: (theme) => ({
		default: {
			input: {
				borderRadius: 'lg',
			},
		},
	}),
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
	],
};
