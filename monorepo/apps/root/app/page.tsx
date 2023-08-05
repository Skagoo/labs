'use client';

import {PointerLight} from '@components/pointer-light';
import {Potion} from '@components/potion';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {Bloom, EffectComposer, FXAA} from '@react-three/postprocessing';

const Home = () => {
	return (
		<Canvas>
			<color attach='background' args={[0x000000]} />
			<ambientLight />

			<PerspectiveCamera position={[0, 0, 22]} makeDefault />
			<OrbitControls makeDefault target={[0, 6, 0]} />

			<Potion />
			<PointerLight />

			<EffectComposer disableNormalPass>
				<FXAA />
				<Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.25} intensity={2} />
			</EffectComposer>
		</Canvas>
	);
};

export default Home;
