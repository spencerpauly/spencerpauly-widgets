import { DEFAULT_PAGE_TITLE } from '@/utils/consts';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
//
const Custom404Page: NextPage = () => {
	return (
		<div>
			<Head>
				<title>{DEFAULT_PAGE_TITLE}</title>
			</Head>

			<div className='relative'>
				<div className='absolute text-3xl text-gray-500 top-4 left-4'>
					<a href='/'>
						<FaChevronLeft />
					</a>
				</div>
				<div className={`flex items-center justify-center w-full h-screen`}>
					<div className='flex flex-col items-center justify-center space-y-2'>
						<h1 className='text-6xl font-bold text-gray-500'>404 Error</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Custom404Page;
