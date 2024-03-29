import { IQueryType } from '@/lib/shared/types/IQueryType';
import { ITimeRange } from '@/lib/shared/types/ITimeRange';
import { StatsEntry } from '@/modules/spotify-stats/SpotifyStatsChart';
import { formatNumberForDisplay } from '@/utils/formatNumberForDisplay';

export const fetchTopItemsForUser = async (type: IQueryType, timeRange: ITimeRange) => {
	return fetch(`/api/spotify/topItemsForUser?type=${type}&time_range=${timeRange}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((res) => res.items)
		.then((items) =>
			type === 'tracks' ? convertTracksToStats(items) : convertArtistsToStats(items)
		);
};

export const createPlaylistForUser = async (tracks: StatsEntry[], timeRange: ITimeRange) => {
	return fetch('/api/spotify/createPlaylistForUser', {
		method: 'POST',
		body: JSON.stringify({
			tracks: tracks.map((track) => `spotify:track:${track.id}`),
			timeRange: timeRange,
		}),
	}).then((res) => res.json());
};

const convertTracksToStats = (tracks: any) => {
	const stats: StatsEntry[] = tracks.map((item: any, index: number) => ({
		id: item.id,
		rank: index + 1,
		title: item.name,
		subTitle: item.artists.map((a: any) => a.name).join(', '),
		image: item.album.images[0].url,
		href: item.external_urls.spotify,
	}));

	return stats;
};

const convertArtistsToStats = (artists: any) => {
	console.log(artists);
	const stats: StatsEntry[] = artists.map((item: any, index: number) => ({
		id: item.id,
		rank: index + 1,
		title: item.name,
		subTitle:
			item.followers.total === 0 ? '' : formatNumberForDisplay(item.followers.total) + ' followers',
		image: item.id !== '5K4W6rqBFWDnAN6FQUkS6x' ? item.images[0].url : '/static/content/ye.jpeg',
		href: item.external_urls.spotify,
	}));

	return stats;
};
