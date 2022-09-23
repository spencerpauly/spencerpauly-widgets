import { NextSeo } from 'next-seo';
import Script from 'next/script';
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
			<Script src='/static/iframeResize.contentWindow.min.js' />
		</>
	);
}
