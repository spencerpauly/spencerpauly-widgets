import { NextPageWithLayout } from '@/types/page';
import { DEFAULT_PAGE_TITLE } from '@/utils/consts';
import React from 'react';
import { SEO } from './components/SEO';

interface BlankLayoutProps {
	title: string;
	children: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ title, children }) => {
	return (
		<div>
			<SEO />

			<div className='flex flex-col h-full m-auto md:flex-row'>
				<main className='flex-grow'>{children}</main>
			</div>
		</div>
	);
};

export default BlankLayout;

export const getBlankLayout = (title?: string) => {
	const getLayout: NextPageWithLayout['getLayout'] = (page) => (
		<BlankLayout title={title || DEFAULT_PAGE_TITLE}>{page}</BlankLayout>
	);
	return getLayout;
};
