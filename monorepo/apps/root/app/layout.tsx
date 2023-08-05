import {Metadata} from 'next';

import '@styles/global.scss'

export const metadata: Metadata = {
	title: '@skagoo/labs',
	viewport: 'width=device-width, initial-scale=1',
	icons: '/favicon.ico'
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<html lang='en'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
