/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	async redirects() {
		return [
			{
				source: '/',
				destination: 'https://spencerpauly.com',
				permanent: false,
			},
		];
	},
};

export default nextConfig;
