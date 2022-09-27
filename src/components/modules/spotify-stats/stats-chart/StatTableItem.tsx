import { Link } from '@chakra-ui/layout';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import { StatsEntry } from '../SpotifyStatsChart';

interface Props {
	statsEntry: StatsEntry;
}

const StatTableItem = ({ statsEntry }: Props) => {
	const isSkeleton = Boolean(statsEntry.isSkeleton);

	if (isSkeleton) {
		return (
			<div className='flex items-center space-x-4'>
				<div className='py-1'>
					<SkeletonCircle />
				</div>
				<div className='flex-grow'>
					<Skeleton className='h-6' />
				</div>
				<div>
					<SkeletonText noOfLines={2} className='w-48' />
				</div>
			</div>
		);
	}
	return (
		<div
			key={statsEntry.id}
			className='flex flex-col items-start justify-between py-1 lg:items-center lg:flex-row'
		>
			<div className='flex space-x-4'>
				<img src={statsEntry.image} className='object-cover w-6 h-6 rounded' />
				<div>
					<b>#{statsEntry.rank}</b>
					<Link className='ml-2' href={statsEntry.href} isExternal>
						{statsEntry.title}
					</Link>
				</div>
			</div>
			<div className='pl-10 text-sm font-bold text-gray-400'>{statsEntry.subTitle}</div>
		</div>
	);
};

export default StatTableItem;
