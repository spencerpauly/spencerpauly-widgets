import { NextPageWithLayout } from '@/types/page';
import { SKELETON_STATS } from '@/utils/consts';
import { Heading } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import { Table, TableContainer, Tbody } from '@chakra-ui/table';
import React from 'react';
import { StatsEntry } from './SpotifyStatsPage';
import StatShowcaseItem from './stats-chart/StatShowcaseItem';
import StatTableItem from './stats-chart/StatTableItem';

interface Props {
	stats?: StatsEntry[];
}

const SpotifyStatsChart: NextPageWithLayout<Props> = ({ stats = SKELETON_STATS }: Props) => {
	return (
		<div>
			<div className='grid grid-cols-12 gap-4'>
				{/* #1 */}
				<div className='col-span-5'>
					{stats[0] && !stats[0].isSkeleton ? (
						<img src={stats[0].image} className='object-cover w-full h-[346px] rounded-2xl' />
					) : (
						<Skeleton className='w-full h-full' borderRadius={16} />
					)}
				</div>
				{/* #2 - #5 */}
				<div className='col-span-7 space-y-2'>
					{stats.slice(1, 5).map((statsEntry) => (
						<StatShowcaseItem statsEntry={statsEntry} />
					))}
				</div>
			</div>
			{stats[0] && !stats[0].isSkeleton ? (
				<div className='flex items-center space-x-6'>
					<div className='text-5xl font-bold'>#{stats[0]?.rank}</div>

					<div className='py-6'>
						<Heading as='h2' size='xl' className=''>
							{stats[0]?.title}
						</Heading>
						<div className='font-bold text-gray-400 uppercase text-md'>By {stats[0]?.subTitle}</div>
					</div>
				</div>
			) : (
				<div className='w-full py-8 space-y-2'>
					<Skeleton className='h-8 w-96' />
					<SkeletonText noOfLines={2} />
				</div>
			)}

			<div className='py-0 mx-24'>
				<div className='w-full '>
					<div className='w-1 h-6 bg-green-400' />
				</div>
			</div>

			<TableContainer className='py-4'>
				<Table variant='unstyled' size='sm'>
					<Tbody>
						{stats?.slice(5, 50).map((statsEntry) => (
							<StatTableItem statsEntry={statsEntry} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default SpotifyStatsChart;
