import { NextPageWithLayout } from '@/types/page';
import { SKELETON_STATS } from '@/utils/consts';
import { Heading, Link } from '@chakra-ui/layout';
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
}

const TopChartItemDetails = ({ stats }: Props) => {
	if (!stats || !stats[0] || stats[0].isSkeleton) {
		return null;
	}
	return (
		<div className='flex items-center space-x-6'>
			<div className='text-5xl font-bold'>#{stats[0]?.rank}</div>

			<div className='pt-6 pb-2'>
				<Heading as='h2' size='xl'>
					<Link href={stats[0]?.href} isExternal>
						{stats[0]?.title}
					</Link>
				</Heading>
				<div className='font-bold text-gray-400 uppercase text-md'>By {stats[0]?.subTitle}</div>
			</div>
		</div>
	);
};

const SpotifyStatsChart: NextPageWithLayout<Props> = ({ stats = SKELETON_STATS }: Props) => {
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
						<TopChartItemDetails stats={stats} />
					</div>
				</div>
				{/* #2 - #5 */}
				<div className='col-span-12 space-y-2 lg:col-span-7'>
					{stats.slice(1, 5).map((statsEntry) => (
						<StatShowcaseItem statsEntry={statsEntry} />
					))}
				</div>
			</div>
			<div className='hidden lg:block'>
				<TopChartItemDetails stats={stats} />
			</div>

			<div className='pt-4 mx-8 lg:mx-24'>
				<div className='w-full '>
					<div className='w-1 h-12 bg-green-400' />
				</div>
			</div>

			<div className='py-4'>
				{stats?.slice(5, 50).map((statsEntry) => (
					<StatTableItem statsEntry={statsEntry} />
				))}
			</div>
		</div>
	);
};

export default SpotifyStatsChart;
