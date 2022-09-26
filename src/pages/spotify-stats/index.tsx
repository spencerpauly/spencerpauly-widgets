import { getBlankLayout } from '@/layouts/BlankLayout';
import SpotifyStatsPage from '@/modules/spotify-stats/SpotifyStatsPage';
import { NextPageWithLayout } from '@/types/page';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';

interface Props {}

const SpotifyStats: NextPageWithLayout<Props> = () => {
	const session = useSession();

	return (
		<>
			<Modal isCentered isOpen={true} onClose={() => {}}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={() => {}}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<SpotifyStatsPage />
		</>
	);
};

SpotifyStats.getLayout = getBlankLayout();

export default SpotifyStats;
