import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import { Td, Tr } from '@chakra-ui/table';
import { StatsEntry } from '../SpotifyStatsPage';

interface Props {
	statsEntry: StatsEntry;
}

const StatTableItem = ({ statsEntry }: Props) => {
	const isSkeleton = Boolean(statsEntry.isSkeleton);

	if (isSkeleton) {
		return (
			<Tr className='flex'>
				<Td>
					<SkeletonCircle />
				</Td>
				<Td className='flex-grow'>
					<Skeleton className='h-6' />
				</Td>
				<Td>
					<SkeletonText noOfLines={2} className='w-48' />
				</Td>
			</Tr>
		);
		/*
    			<div className='flex my-2 space-x-4'>
				<Skeleton className='w-6 h-6 ' borderRadius={4} />
				<div className='w-full'>
					<Skeleton className='h-6' />
				</div>
			</div>
      */
	}
	return (
		<Tr key={statsEntry.id} className='uppercase'>
			<Td paddingTop={1} paddingBottom={1}>
				<img src={statsEntry.image} className='object-cover w-6 h-6 rounded' />
			</Td>
			<Td className='font-bold'>
				<b>#{statsEntry.rank}</b>
				<span className='pl-2'>{statsEntry.title}</span>
			</Td>
			<Td className='font-bold text-gray-400' textAlign='right'>
				{statsEntry.subTitle}
			</Td>
		</Tr>
	);
};

export default StatTableItem;
