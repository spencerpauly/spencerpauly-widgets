import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
export default class MyDocument extends NextDocument {
	render() {
		return (
			<Html>
				<Head></Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
