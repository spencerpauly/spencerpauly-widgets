import '@/styles/global.css';
import '@/styles/tailwind.css';
import { AppPropsWithLayout } from '@/types/page';
import ProgressBar from '@badrap/bar-of-progress';
import { ChakraProvider, extendTheme, withDefaultProps } from '@chakra-ui/react';
import 'core-js/es6/map'; // for yup
import 'core-js/es6/promise'; // for yup
import 'core-js/es6/set'; // for yup
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.min.css';

const queryClient = new QueryClient();

const theme = extendTheme(
	withDefaultProps({
		defaultProps: {
			speed: 2,
		},
		components: ['Skeleton', 'SkeletonText', 'SkeletonCircle'],
	})
);

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
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)} </ChakraProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default App;
