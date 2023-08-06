import {Metadata} from 'next';

import '@styles/global.scss';
import {Header} from '@components/potion/header/header';

export const metadata: Metadata = {
	title: '@skagoo/labs',
	viewport: 'width=device-width, initial-scale=1',
	icons: '/favicon.ico'
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<html lang='en'>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
