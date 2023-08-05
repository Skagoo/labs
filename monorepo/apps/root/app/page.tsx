'use client';

import {GodraysSource} from '@components/godrays-source';
import {Marble} from '@components/marble';
import {OrbitControls, OrthographicCamera} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

const Home = () => {
	return (
		<Canvas shadows>
			<OrthographicCamera position={[0, 0, 10]} zoom={64} makeDefault />
			<OrbitControls makeDefault target={[0, 0, 0]} />

			<ambientLight />

			<GodraysSource />
			<Marble />
		</Canvas>
	);
};

export default Home;
