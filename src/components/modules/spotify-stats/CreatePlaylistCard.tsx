import { StatsEntry } from '@/modules/spotify-stats/SpotifyStatsChart';
import { Alert, AlertIcon, Button, Heading } from '@chakra-ui/react';
import { Magicpen } from 'iconsax-react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface CreatePlaylistCardProps {
	onClick: () => void;
	isLoading: boolean;
	playlistUrl: string | null;
}

export const CreatePlaylistCard = ({
	playlistUrl,
	onClick,
	isLoading,
}: CreatePlaylistCardProps) => {
	return (
		<div className='p-8 bg-white border rounded-lg shadow-lg'>
			<Heading as='h3' size='xl' className='pb-4'>
				Want to listen to these on Spotify?
			</Heading>

			<div className='pb-4'>
				Save your top 50 tracks into a Spotify playlist for easy listening.
			</div>

			<Button onClick={onClick} colorScheme='brand' isLoading={isLoading} rightIcon={<Magicpen />}>
				Create a Playlist with my Top 50 Tracks
			</Button>

			{playlistUrl && (
				<div className='pt-4 text-sm'>
					<Alert status='success' variant='subtle'>
						<AlertIcon />
						<p>
							Congrats!{' '}
							<a
								className='underline font-bold inline-flex items-center'
								target='_blank'
								rel='nofollow'
								href={playlistUrl}
							>
								<span>Your playlist has been created</span>
								<FaExternalLinkAlt className='inline ml-1 h-3' />
							</a>
							. Enjoy!
						</p>
					</Alert>
				</div>
			)}
		</div>
	);
};
