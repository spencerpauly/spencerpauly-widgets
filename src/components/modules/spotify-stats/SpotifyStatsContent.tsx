import { createPlaylistForUser, fetchTopItemsForUser } from '@/lib/frontend/spotify';
import { formatQueryType, IQueryType, queryTypes } from '@/lib/shared/types/IQueryType';
import { formatTimeRange, ITimeRange, timeRanges } from '@/lib/shared/types/ITimeRange';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/menu';
import { useBreakpointValue } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import SpotifyStatsChart, { StatsEntry } from './SpotifyStatsChart';
import { CreatePlaylistCard } from '@/modules/spotify-stats/CreatePlaylistCard';
interface QuerySettings {
	type: IQueryType;
	timeRange: ITimeRange;
	playlistUrl: string | null;
}

const SpotifyStatsContent = () => {
	const [querySettings, setQuerySettings] = useState<QuerySettings>({
		type: 'tracks',
		timeRange: 'long_term',
		playlistUrl: null,
	});

	const { data } = useQuery(['top-items-for-user', querySettings], () =>
		fetchTopItemsForUser(querySettings.type, querySettings.timeRange)
	);

	const createPlaylistMutation = useMutation(
		(tracks: StatsEntry[]) => createPlaylistForUser(tracks, querySettings.timeRange),
		{
			onSuccess: (res: any) => {
				if (res?.response?.playlist?.external_urls?.spotify) {
					setQuerySettings((current) => ({
						...current,
						playlistUrl: res.response.playlist.external_urls.spotify,
					}));
				}
			},
		}
	);

	const isAbleToCreatePlaylist = querySettings.type === 'tracks' && data;

	const handleCreatePlaylist = () => {
		if (querySettings.type === 'artists') return;
		if (!data) return;
		createPlaylistMutation.mutate(data);
	};

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
								onChange={(e: any) =>
									setQuerySettings((cur) => ({ ...cur, type: e, playlistUrl: null }))
								}
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
								onChange={(e: any) =>
									setQuerySettings((cur) => ({ ...cur, timeRange: e, playlistUrl: null }))
								}
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
			<SpotifyStatsChart stats={data} isArtistView={querySettings.type === 'artists'} />
			{isAbleToCreatePlaylist && (
				<div className='grid grid-cols-12'>
					<div className='hidden col-span-5 py-4 ml-24 mr-8 lg:block'>
						<div className='w-full'>
							<div className='w-1 h-32 bg-green-400' />
						</div>
						<div className='w-full h-1 bg-green-400 '></div>
					</div>
					<div className='w-full col-span-12 pt-12 lg:col-span-7'>
						<CreatePlaylistCard
							onClick={handleCreatePlaylist}
							isLoading={createPlaylistMutation.isLoading}
							playlistUrl={querySettings.playlistUrl}
						/>
					</div>
				</div>
			)}

			<div className='flex justify-center pt-24 pb-8'>
				<Button variant='link' onClick={() => signOut()}>
					Sign out of spotify
				</Button>
			</div>
		</div>
	);
};

export default SpotifyStatsContent;
