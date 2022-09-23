import { Session as AuthSession } from 'next-auth';

export default interface Session extends AuthSession {
	id?: string;
	token?: string;
}

export type SessionProp = {
	session: Session | null;
};
