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

const theme = extendTheme({
	...withDefaultProps({
		defaultProps: {
			speed: 2,
		},
		components: ['Skeleton', 'SkeletonText', 'SkeletonCircle'],
	}),
	components: {
		Link: { baseStyle: { _focus: { boxShadow: 'none' } } },
		Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
	},
	colors: {
		brand: {
			100: '#dcfce7',
			200: '#bbf7d0',
			300: '#86efac',
			400: '#4ade80',
			500: '#22c55e',
			600: '#16a34a',
			700: '#15803d',
			800: '#166534',
			900: '#14532d',
		},
	},
});

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
