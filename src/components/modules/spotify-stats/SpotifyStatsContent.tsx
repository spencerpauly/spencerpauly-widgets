import { fetchTopItemsForUser, QuerySettings } from '@/lib/frontend/spotify';
import { NextPageWithLayout } from '@/types/page';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Heading, Link } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/menu';
import { useBreakpointValue } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { FaChevronDown, FaTwitter } from 'react-icons/fa';
import { useQuery } from 'react-query';
import SpotifyStatsChart from './SpotifyStatsChart';

enum TIME_RANGE_DISPLAY_VALUE {
	short_term = 'Month',
	medium_term = '6 Months',
	long_term = '2+ Years',
}

enum TYPE_DISPLAY_VALUE {
	tracks = 'Tracks',
	artists = 'Artists',
}

interface Props {
	sessionStatus: 'authenticated' | 'unauthenticated' | 'loading';
}

const SpotifyStatsContent: NextPageWithLayout<Props> = ({ sessionStatus }) => {
	const [querySettings, setQuerySettings] = useState<QuerySettings>({
		type: 'tracks',
		timeRange: 'long_term',
	});

	const { data, isLoading, isError } = useQuery(['top-items-for-user', querySettings], () =>
		fetchTopItemsForUser(querySettings)
	);

	const typeDropdown = useDisclosure();
	const timeRangeDropdown = useDisclosure();
	const menuButtonSize = useBreakpointValue({
		base: 'sm',
		lg: 'lg',
	});

	return (
		<div className='container max-w-4xl px-4 pb-4 mx-auto'>
			<div className='flex flex-col items-center justify-center pt-24 pb-4 '>
				<h1 className='text-4xl font-bold lg:text-7xl'>My Spotify Top 50</h1>
				<div className='py-4'>
					<Menu isOpen={typeDropdown.isOpen} onClose={typeDropdown.onClose}>
						<MenuButton
							size={menuButtonSize}
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
							size={menuButtonSize}
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
			<div className='py-4 mx-8 lg:mx-24'>
				<div className='w-full h-1 bg-green-400 '></div>
				<div className='w-full'>
					<div className='w-1 h-12 bg-green-400' />
				</div>
			</div>
			<SpotifyStatsChart stats={data} />
			<div className='grid grid-cols-12'>
				<div className='hidden col-span-5 py-4 ml-24 mr-8 lg:block'>
					<div className='w-full'>
						<div className='w-1 h-32 bg-green-400' />
					</div>
					<div className='w-full h-1 bg-green-400 '></div>
				</div>
				<div className='w-full col-span-12 pt-12 lg:col-span-7'>
					<div className='p-8 bg-white border rounded-lg shadow-lg'>
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
			<div className='flex justify-center pt-24 pb-8'>
				<Button variant='link' onClick={() => signOut()}>
					Sign out of spotify
				</Button>
			</div>
		</div>
	);
};

export default SpotifyStatsContent;
