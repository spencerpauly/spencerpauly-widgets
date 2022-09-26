import { SCOPES } from '@/lib/backend/spotifyController';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
if (!process.env.SPOTIFY_CLIENT_ID) throw Error('[env] No SPOTIFY_CLIENT_ID');
if (!process.env.SPOTIFY_CLIENT_SECRET) throw Error('[env] No SPOTIFY_CLIENT_SECRET');

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: `https://accounts.spotify.com/authorize?scope=${SCOPES.join(',')}`,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.refresh_token;
			}
			return token;
		},
		async session({ session, user, token }) {
			session.user = user as any;
			session.token = token as any;
			return session;
		},
	},
});
