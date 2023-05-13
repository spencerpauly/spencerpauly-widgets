import { StatsEntry } from '@/modules/spotify-stats/SpotifyStatsChart';
import { Heading, Link } from '@chakra-ui/react';

interface Props {
	stats?: StatsEntry[];
	isArtistView: boolean;
}

export const TopChartItemDetails = ({ stats, isArtistView }: Props) => {
	if (!stats || !stats[0] || stats[0].isSkeleton) {
		return null;
	}
	return (
		<div className='flex items-center space-x-6'>
			<div className='text-5xl font-bold'>#{stats[0]?.rank}</div>

			<div className='pt-4 pb-4'>
				<Heading as='h2' size='xl'>
					<Link href={stats[0]?.href} isExternal>
						{stats[0]?.title}
					</Link>
				</Heading>
				<div className='font-bold text-gray-400 uppercase text-md'>
					{!isArtistView && 'By '}
					{stats[0]?.subTitle}
				</div>
			</div>
		</div>
	);
};
