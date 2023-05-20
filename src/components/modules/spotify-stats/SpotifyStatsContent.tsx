import { fetchTopItemsForUser } from '@/lib/frontend/spotify';
import { formatQueryType, IQueryType, queryTypes } from '@/lib/shared/types/IQueryType';
import { ISessionStatus } from '@/lib/shared/types/ISessionStatus';
import { formatTimeRange, ITimeRange, timeRanges } from '@/lib/shared/types/ITimeRange';
import { NextPageWithLayout } from '@/types/page';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Heading } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/menu';
import { useBreakpointValue } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { FaChevronDown, FaTwitter } from 'react-icons/fa';
import { useQuery } from 'react-query';
import SpotifyStatsChart from './SpotifyStatsChart';

interface QuerySettings {
	type: IQueryType;
	timeRange: ITimeRange;
}

interface Props {
	sessionStatus: ISessionStatus;
}

const SpotifyStatsContent: NextPageWithLayout<Props> = ({ sessionStatus }) => {
	const [querySettings, setQuerySettings] = useState<QuerySettings>({
		type: 'tracks',
		timeRange: 'long_term',
	});

	const { data } = useQuery(['top-items-for-user', querySettings], () =>
		fetchTopItemsForUser(querySettings.type, querySettings.timeRange)
	);

	// const { data } = useQuery(['create-playlist-for-user', querySettings], () =>
	// 	fetchTopItemsForUser(querySettings.type, querySettings.timeRange)
	// );

	const typeDropdown = useDisclosure();
	const timeRangeDropdown = useDisclosure();
	const menuButtonSize = useBreakpointValue({
		base: 'sm',
		lg: 'lg',
	});

	return (
		<div className='container max-w-4xl px-4 pb-4 mx-auto'>
			<div className='flex flex-col items-center justify-center pt-12 pb-4 lg:pt-24 '>
				<h1 className='text-4xl font-bold lg:text-7xl'>Your Spotify Top 50</h1>
				<div className='py-4'>
					<Menu isOpen={typeDropdown.isOpen} onClose={typeDropdown.onClose}>
						<MenuButton
							size={menuButtonSize}
							onClick={typeDropdown.onOpen}
							as={Button}
							variant='outline'
							rightIcon={<FaChevronDown />}
						>
							{formatQueryType(querySettings.type)}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								type='radio'
								onChange={(e: any) => setQuerySettings((cur) => ({ ...cur, type: e }))}
							>
								{queryTypes.map((value) => (
									<MenuItemOption value={value}>{formatQueryType(value)}</MenuItemOption>
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
							variant='outline'
							rightIcon={<FaChevronDown />}
						>
							{formatTimeRange(querySettings.timeRange)}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								type='radio'
								onChange={(e: any) => setQuerySettings((cur) => ({ ...cur, timeRange: e }))}
							>
								{timeRanges.map((value) => (
									<MenuItemOption value={value}>{formatTimeRange(value)}</MenuItemOption>
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
			<SpotifyStatsChart stats={data} querySettings={querySettings} />
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
							The fun doesn't need to end here. Coming soon you'll be able to save these songs into
							a personal spotify playlist.
						</div>
						<div className='py-4'>Stay up to date on new features by...</div>

						<a href='https://twitter.com/SpencerPauly' target='_blank' rel='nofollow'>
							<Button colorScheme='twitter' rightIcon={<FaTwitter />}>
								Following me on Twitter
							</Button>
						</a>
						{/* <div>
							The fun doesn't need to end here. You can{' '}
							<Link color='teal.500'>save these songs into a personal spotify playlist</Link>.
						</div>
						<div className='py-4'>Or, support this app by...</div>

						<Button colorScheme='twitter' rightIcon={<FaTwitter />}>
							Sharing on Twitter
						</Button> */}
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
