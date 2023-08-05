'use client';

import {Experiments} from '@components/experiments';
import {PointerLight} from '@components/pointer-light';
import {PerspectiveCamera} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {Bloom, EffectComposer, FXAA} from '@react-three/postprocessing';
import {PerspectiveCamera as ThreePerspectiveCamera} from 'three';

const Home = () => {
	return (
		<Canvas>
			<color attach='background' args={[0x000000]} />
			<ambientLight />

			<PerspectiveCamera
				ref={(camera: ThreePerspectiveCamera) => camera?.lookAt(0, 6, 0)}
				position={[0, 0, 22]}
				makeDefault
			/>
			<Experiments />
			<PointerLight />

			<EffectComposer disableNormalPass>
				<FXAA />
				<Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.25} intensity={2} />
			</EffectComposer>
		</Canvas>
	);
};

export default Home;
