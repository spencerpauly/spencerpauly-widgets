import { StatsEntry } from '@/modules/spotify-stats/SpotifyStatsPage';
import { formatNumberForDisplay } from '@/utils/formatNumberForDisplay';

export interface QuerySettings {
	type: 'tracks' | 'artists';
	timeRange: 'short_term' | 'medium_term' | 'long_term';
}

export const fetchTopItemsForUser = async (querySettings: QuerySettings) => {
	return fetch(
		`/api/spotify/topItemsForUser?type=${querySettings.type}&time_range=${querySettings.timeRange}`,
		{
			method: 'GET',
		}
	)
		.then((res) => res.json())
		.then((res) => res.items)
		.then((items) =>
			querySettings.type === 'tracks' ? convertTracksToStats(items) : convertArtistsToStats(items)
		);
};

export const fetchTopArtists = async (querySettings: QuerySettings) => {
	return fetch('/api/spotify/topTracksForUser', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((res) => res.items)
		.then((tracks) => convertTracksToStats(tracks));
};

const convertTracksToStats = (tracks: any) => {
	const stats: StatsEntry[] = tracks.map((item: any, index: number) => ({
		id: item.id,
		rank: index + 1,
		title: item.name,
		subTitle: item.artists.map((a: any) => a.name).join(', '),
		image: item.album.images[0].url,
	}));

	return stats;
};

const convertArtistsToStats = (artists: any) => {
	console.log('spee', artists);
	const stats: StatsEntry[] = artists.map((item: any, index: number) => ({
		id: item.id,
		rank: index + 1,
		title: item.name,
		subTitle: formatNumberForDisplay(item.followers.total) + ' followers',
		image: item.id !== '5K4W6rqBFWDnAN6FQUkS6x' ? item.images[0].url : '/static/content/ye.jpeg',
	}));

	return stats;
};
