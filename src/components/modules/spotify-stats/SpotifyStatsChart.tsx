import { TopChartItemDetails } from '@/modules/spotify-stats/stats-chart/TopChartItemDetails';
import { NextPageWithLayout } from '@/types/page';
import { SKELETON_STATS } from '@/utils/consts';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react';
import StatShowcaseItem from './stats-chart/StatShowcaseItem';
import StatTableItem from './stats-chart/StatTableItem';

export interface StatsEntry {
	id: string;
	rank: number;
	title: string;
	subTitle: string;
	image: string;
	href: string;
	isSkeleton?: boolean;
}
interface Props {
	stats?: StatsEntry[];
	isArtistView: boolean;
}

const SpotifyStatsChart: NextPageWithLayout<Props> = ({
	stats = SKELETON_STATS,
	isArtistView,
}: Props) => {
	return (
		<div>
			<div className='grid grid-cols-12 gap-4'>
				{/* #1 */}
				<div className='col-span-12 lg:col-span-5'>
					{stats[0] && !stats[0].isSkeleton ? (
						<img
							src={stats[0].image}
							className='object-cover w-full h-auto lg:h-[346px] rounded-2xl'
						/>
					) : (
						<Skeleton className='w-full h-full' borderRadius={16} />
					)}
					<div className='block lg:hidden'>
						<TopChartItemDetails stats={stats} isArtistView={isArtistView} />
					</div>
				</div>
				{/* #2 - #5 */}
				<div className='col-span-12 space-y-2 lg:col-span-7'>
					{stats.slice(1, 5).map((statsEntry) => (
						<StatShowcaseItem key={statsEntry.id} statsEntry={statsEntry} />
					))}
				</div>
			</div>
			<div className='hidden lg:block'>
				<TopChartItemDetails stats={stats} isArtistView={isArtistView} />
			</div>

			<div className='pt-4 mx-8 lg:mx-24'>
				<div className='w-full '>
					<div className='w-1 h-12 bg-green-400' />
				</div>
			</div>

			<div className='py-4'>
				{stats?.slice(5, 50).map((statsEntry) => (
					<StatTableItem key={statsEntry.id} statsEntry={statsEntry} />
				))}
			</div>
		</div>
	);
};

export default SpotifyStatsChart;
