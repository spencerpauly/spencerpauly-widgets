import { StatsEntry } from '@/modules/spotify-stats/SpotifyStatsChart';

export const DEFAULT_PAGE_TITLE = 'Spencer Pauly | Widgets';

export const SKELETON_STATS: StatsEntry[] = [...Array(50).keys()].map((i) => ({
	id: i.toString(),
	rank: i + 1,
	title: 'filler',
	subTitle: 'filler',
	image: 'filler',
	href: '/',
	isSkeleton: true,
}));
