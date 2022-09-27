import Navbar from '@/common/Navbar';
import { NextPageWithLayout } from '@/types/page';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
	Alert,
	AlertIcon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import SpotifyStatsContent from './SpotifyStatsContent';
interface Props {}

interface Props {
	sessionStatus: 'authenticated' | 'unauthenticated' | 'loading';
}

const SpotifyStatsPage: NextPageWithLayout<Props> = ({ sessionStatus }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			onOpen();
		}
	}, [sessionStatus]);
	return (
		<>
			<Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className='mx-4'>
					<ModalCloseButton />
					<ModalHeader className='text-4xl'>
						Connect Spotify <FaSpotify className='inline text-lg text-green-500 align-text-top' />
					</ModalHeader>
					<ModalBody>
						<div className='pb-4'>
							<img
								src='/static/content/drake.jpeg'
								className='object-cover w-full h-auto rounded-3xl max-h-96'
							/>
						</div>
						<div className='px-4 py-4 text-gray-700'>
							<span className='text-green-600'>Spotify</span> authentication is required to display
							your personal listening charts. This connection is read-only and won't change any of
							your playlists.
						</div>
					</ModalBody>

					<ModalFooter>
						<Button onClick={() => signIn('spotify')} colorScheme='green' rightIcon={<FaSpotify />}>
							Sign in with Spotify
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Navbar />

			{sessionStatus === 'unauthenticated' && (
				<Alert className='break-words' status='info'>
					<AlertIcon />
					<p>
						You need to be signed in with Spotify to use this app,{' '}
						<Button onClick={onOpen} variant='link'>
							click here to sign in
						</Button>
						.
					</p>
				</Alert>
			)}
			<SpotifyStatsContent sessionStatus={sessionStatus} />
		</>
	);
};

export default SpotifyStatsPage;
