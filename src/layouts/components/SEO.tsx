import { NextSeo } from 'next-seo';
import Head from 'next/head';
import React from 'react';

export function SEO() {
	return (
		<>
			<NextSeo
				title={'Spencer Pauly | Widgets'}
				description={''}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: 'favicon.ico',
					},
				]}
			/>
			<Head>
				<script src='/static/iframeResize.contentWindow.min.js' />
			</Head>
		</>
	);
}
