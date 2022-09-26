import { getUsersTopItems } from '@/lib/backend/spotifyController';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });

	const accessToken = (session?.token as any).accessToken;

	if (!accessToken) {
		return res.status(400).json({ message: 'Error' });
	}

	const { type, time_range } = req.query;

	if (typeof type !== 'string') throw new Error('Error: Missing parameter `type`');
	if (typeof time_range !== 'string') throw new Error('Error: Missing parameter `time_range`');

	const response = await getUsersTopItems(accessToken, type, time_range);
	const { items } = await response.json();

	return res.status(200).json({ items });
};
