import { Heading, Link } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import { StatsEntry } from '../SpotifyStatsChart';
interface Props {
	statsEntry: StatsEntry;
}

const StatShowcaseItem = ({ statsEntry }: Props) => {
	const isSkeleton = Boolean(statsEntry.isSkeleton);

	if (isSkeleton) {
		return (
			<div className='flex space-x-4'>
				<Skeleton className='h-auto w-28 ' borderRadius={8} />
				<div className='w-full my-4 space-y-2'>
					<Skeleton className='h-6' />
					<SkeletonText noOfLines={2} />
				</div>
			</div>
		);
	}
	return (
		<div className='flex space-x-4'>
			<img src={statsEntry.image} className='object-cover w-20 h-20 rounded-lg' />
			<div className='flex flex-col justify-center'>
				<Heading as='h4' size='md' className='break-words'>
					<Link href={statsEntry.href} isExternal>
						#{statsEntry.rank + ' ' + statsEntry.title}
					</Link>
				</Heading>
				<div className='text-sm font-bold text-gray-400 uppercase'>{statsEntry.subTitle}</div>
			</div>
		</div>
	);
};

export default StatShowcaseItem;
