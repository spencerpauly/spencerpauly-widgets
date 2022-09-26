if (!process.env.SPOTIFY_CLIENT_ID) throw Error('[env] No SPOTIFY_CLIENT_ID');
if (!process.env.SPOTIFY_CLIENT_SECRET) throw Error('[env] No SPOTIFY_CLIENT_SECRET');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_ITEMS_ENDPOINT = 'https://api.spotify.com/v1/me/top';

const getAccessToken = async (refresh_token: string) => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	});

	return response.json();
};

export const getUsersTopItems = async (refresh_token: string, type: string, timeRange: string) => {
	const { access_token } = await getAccessToken(refresh_token);
	return fetch(`${TOP_ITEMS_ENDPOINT}/${type}?time_range=${timeRange}&limit=50&offset=0`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const SCOPES = [
	'user-library-modify',
	'user-library-read',
	'user-read-email',
	'user-read-private',
	'user-modify-playback-state',
	'user-read-private',
	'user-read-private',
	'user-top-read',
	'playlist-modify-public',
	'playlist-modify-private',
	'playlist-read-collaborative',
	'playlist-read-private',
];

export const REDIRECT_URL = 'http://localhost:4000/api/spotify/callback';

export {};
