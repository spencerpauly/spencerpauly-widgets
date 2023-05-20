import Navbar from '@/common/Navbar';
import { NextPageWithLayout } from '@/types/page';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
	Alert,
	AlertDescription,
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
			<Modal size='md' isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className='mx-4'>
					<ModalCloseButton />
					<ModalHeader className='text-4xl'>
						Sign in with Spotify{' '}
						<FaSpotify className='inline text-xs text-green-500 align-text-top' />
					</ModalHeader>
					<ModalBody>
						<div className='pb-4'>
							<img
								src='/static/content/drake.jpeg'
								className='object-cover w-full h-auto rounded-3xl max-h-96'
							/>
						</div>
						<div className='px-4 py-4 text-gray-700'>
							Signing in with <span className='text-green-600'>Spotify</span> will allow you to view
							your personal listening charts.
						</div>
					</ModalBody>

					<ModalFooter>
						<ButtonGroup>
							<Button onClick={onClose} variant='outline'>
								Cancel
							</Button>
							<Button
								onClick={() => signIn('spotify')}
								colorScheme='green'
								rightIcon={<FaSpotify />}
							>
								Sign in with Spotify
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Navbar />

			{sessionStatus === 'unauthenticated' && (
				<div className='max-w-xl p-4 mx-auto'>
					<Alert variant='subtle' className='break-words rounded-lg' status='warning'>
						<AlertIcon />
						<AlertDescription>
							You need to be signed in with Spotify to use this app,{' '}
							<Button onClick={onOpen} variant='link'>
								click here to sign in
							</Button>
							.
						</AlertDescription>
					</Alert>
				</div>
			)}
			<SpotifyStatsContent />
		</>
	);
};

export default SpotifyStatsPage;
