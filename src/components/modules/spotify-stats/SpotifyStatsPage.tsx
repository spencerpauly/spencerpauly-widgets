import MagicBackground from '@/common/MagicBackground';
import { fetchTopItemsForUser, QuerySettings } from '@/lib/frontend/spotify';
import { NextPageWithLayout } from '@/types/page';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Heading, Link } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/menu';
import { signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { FaChevronDown, FaTwitter } from 'react-icons/fa';
import { useQuery } from 'react-query';
import SpotifyStatsChart from './SpotifyStatsChart';

export interface StatsEntry {
	id: string;
	rank: number;
	title: string;
	subTitle: string;
	image: string;
	isSkeleton?: boolean;
}

enum TIME_RANGE_DISPLAY_VALUE {
	short_term = 'Month',
	medium_term = '6 Months',
	long_term = '2+ Years',
}

enum TYPE_DISPLAY_VALUE {
	tracks = 'Tracks',
	artists = 'Artists',
}

interface Props {}

const SpotifyStatsPage: NextPageWithLayout<Props> = () => {
	const [querySettings, setQuerySettings] = useState<QuerySettings>({
		type: 'tracks',
		timeRange: 'long_term',
	});

	const { data, isLoading, isError } = useQuery(['top-items-for-user', querySettings], () =>
		fetchTopItemsForUser(querySettings)
	);

	const typeDropdown = useDisclosure();
	const timeRangeDropdown = useDisclosure();

	return (
		<MagicBackground height={20} bgClassName='bg-green-400'>
			<div className='container max-w-4xl pb-24 mx-auto'>
				<Button onClick={() => signIn()}>Sign into spotify</Button>
				<Button onClick={() => signOut()}>Sign outof spotify</Button>
				{/* <Button onClick={() => fetchTopTracks()}>fetch</Button> */}
				<div className='flex flex-col items-center justify-center pt-24 pb-4 '>
					<Heading as='h1' size='4xl'>
						My Spotify Top 50
					</Heading>
					<div className='py-4'>
						<Menu isOpen={typeDropdown.isOpen} onClose={typeDropdown.onClose}>
							<MenuButton
								size='lg'
								onClick={typeDropdown.onOpen}
								as={Button}
								rightIcon={<FaChevronDown />}
							>
								{TYPE_DISPLAY_VALUE[querySettings.type]}
							</MenuButton>
							<MenuList>
								<MenuOptionGroup
									type='radio'
									onChange={(e: any) => setQuerySettings((cur) => ({ ...cur, type: e }))}
								>
									{Object.entries(TYPE_DISPLAY_VALUE).map(([key, value]) => (
										<MenuItemOption value={key}>{value}</MenuItemOption>
									))}
								</MenuOptionGroup>
							</MenuList>
						</Menu>
						<span className='px-4 text-lg font-bold'>of the past</span>
						<Menu isOpen={timeRangeDropdown.isOpen} onClose={timeRangeDropdown.onClose}>
							<MenuButton
								size='lg'
								onClick={timeRangeDropdown.onOpen}
								as={Button}
								rightIcon={<FaChevronDown />}
							>
								{TIME_RANGE_DISPLAY_VALUE[querySettings.timeRange]}
							</MenuButton>
							<MenuList>
								<MenuOptionGroup
									type='radio'
									onChange={(e: any) => setQuerySettings((cur) => ({ ...cur, timeRange: e }))}
								>
									{Object.entries(TIME_RANGE_DISPLAY_VALUE).map(([key, value]) => (
										<MenuItemOption value={key}>{value}</MenuItemOption>
									))}
								</MenuOptionGroup>
							</MenuList>
						</Menu>
					</div>
				</div>
				<div className='py-4 mx-24'>
					<div className='w-full h-1 bg-green-400 '></div>
					<div className='w-full'>
						<div className='w-1 h-12 bg-green-400' />
					</div>
				</div>
				<SpotifyStatsChart stats={data} />
				<div className='grid grid-cols-12'>
					<div className='col-span-5 py-4 ml-24 mr-8'>
						<div className='w-full'>
							<div className='w-1 h-32 bg-green-400' />
						</div>
						<div className='w-full h-1 bg-green-400 '></div>
					</div>
					<div className='w-full col-span-7 p-8 mt-12 bg-white border rounded-lg shadow-lg'>
						<Heading as='h3' size='xl' className='pb-4'>
							Like what you see?
						</Heading>
						<div>
							The fun doesn't need to end here. You can{' '}
							<Link color='teal.500'>save these songs into a personal spotify playlist</Link>.
						</div>
						<div className='py-4'>Or, support this app by...</div>

						<Button colorScheme='twitter' rightIcon={<FaTwitter />}>
							Sharing on Twitter
						</Button>
					</div>
				</div>
			</div>
		</MagicBackground>
	);
};

export default SpotifyStatsPage;
