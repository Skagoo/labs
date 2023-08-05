'use client';

import {PointerLight} from '@components/pointer-light';
import {Potion} from '@components/potion';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

const Home = () => {
	return (
		<Canvas shadows>
			<color attach='background' args={[0x000000]} />
			<ambientLight />

			<PerspectiveCamera position={[0, 0, 22]} makeDefault />
			<OrbitControls makeDefault target={[0, 6, 0]} />

			<Potion />
			<PointerLight />
		</Canvas>
	);
};

export default Home;
