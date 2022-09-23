import 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
	 */
	interface Session {
		id?: string;
		token?: string;
		user: {
			/** The user's postal address. */
			address: string;
		};
	}
}
