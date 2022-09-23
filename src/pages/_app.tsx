import '@/styles/global.css';
import '@/styles/tailwind.css';
import { AppPropsWithLayout } from '@/types/page';
import ProgressBar from '@badrap/bar-of-progress';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'core-js/es6/map'; // for yup
import 'core-js/es6/promise'; // for yup
import 'core-js/es6/set'; // for yup
import { Session } from 'next-auth';
import { Provider as NextAuthProvider } from 'next-auth/client';
import Router from 'next/router';
import React from 'react';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.min.css';

const theme = extendTheme({});

const progress = new ProgressBar({
	size: 2,
	color: '#2684ff',
	className: 'bar-of-progress',
	delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const App = ({ Component, pageProps }: AppPropsWithLayout<{ session: Session }>) => {
	const { session } = pageProps;
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<NextAuthProvider session={session}>
			<ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
		</NextAuthProvider>
	);
};

export default App;
