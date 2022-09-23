import { value getBlankLayout } from '@/layouts/BlankLayout';
import { value NextPageWithLayout } from '@/types/page';
import { value Heading, value Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface Props {}

const Index: NextPageWithLayout<Props> = () => {
	return (
		<div className='container flex flex-col pt-12 mx-auto'>
			<Heading>Widgets</Heading>
			<Link href='/spotify-stats/'>
				<ChakraLink>Spotify Stats App</ChakraLink>
			</Link>
		</div>
	);
};

Index.getLayout = getBlankLayout();

export default Index;
