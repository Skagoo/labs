'use client';

import {Potion} from '@components/potion';
import {OrbitControls, OrthographicCamera} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {Bloom, EffectComposer, GodRays} from '@react-three/postprocessing';
import {useEffect, useRef} from 'react';

const Home = () => {
	return (
		<Canvas shadows>
			<color attach='background' args={[0x000000]} />
			<OrthographicCamera position={[0, 5, 10]} zoom={64} makeDefault />
			<OrbitControls makeDefault target={[0, 5, 0]} />

			<ambientLight />

			<Potion />
		</Canvas>
	);
};

export default Home;
