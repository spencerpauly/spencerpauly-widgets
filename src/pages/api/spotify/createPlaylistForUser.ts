import { createPlaylistForUser, getUsersTopItems } from '@/lib/backend/spotifyController';
import { ITimeRange } from '@/lib/shared/types/ITimeRange';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });

	const accessToken = (session?.token as any)?.accessToken;

	if (!accessToken) {
		return res.status(400).json({ message: 'Error' });
	}

	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	const { tracks, timeRange } = JSON.parse(req.body);

	if (typeof timeRange !== 'string') throw new Error('Error: Missing parameter `time_range`');
	if (!tracks || tracks.length === 0) throw new Error('Error: No tracks found for playlist');

	const response = await createPlaylistForUser(accessToken, tracks, timeRange as ITimeRange);
	// const { items } = await response.json();

	return res.status(200).json({ response });
};
