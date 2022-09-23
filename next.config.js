// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');

// next.js configuration
const nextConfig = {
	// https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
	// reactStrictMode: true,
	future: { webpack5: true },
	images: {
		domains: ['source.unsplash.com'],
	},
};

module.exports = withPlugins([], nextConfig);
