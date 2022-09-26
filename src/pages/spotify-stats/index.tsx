import { getBlankLayout } from '@/layouts/BlankLayout';
import SpotifyStatsPage from '@/modules/spotify-stats/SpotifyStatsPage';
import { NextPageWithLayout } from '@/types/page';
import { useSession } from 'next-auth/react';
import React from 'react';
interface Props {}

const SpotifyStats: NextPageWithLayout<Props> = () => {
	const session = useSession();

	return <SpotifyStatsPage sessionStatus={session.status} />;
};

SpotifyStats.getLayout = getBlankLayout();

export default SpotifyStats;
