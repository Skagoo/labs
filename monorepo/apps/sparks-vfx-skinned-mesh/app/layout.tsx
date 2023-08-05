import {Metadata} from 'next';

import '@styles/global.scss'

export const metadata: Metadata = {
	title: '@skagoo/labs - Sparks VFX Skinned Mesh',
	viewport: 'width=device-width, initial-scale=1',
	icons: '/favicon.ico'
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<html lang='en'>
			<head>
				<link rel='prefetch' crossOrigin='anonymous' href='/draco/1.5.5/decoders/draco_wasm_wrapper.js' />
				<link rel='prefetch' crossOrigin='anonymous' href='/draco/1.5.5/decoders/draco_decoder.wasm' />
			</head>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
