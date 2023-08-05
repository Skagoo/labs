import {MeshTransmissionMaterial} from '@react-three/drei';

export const Marble = () => (
	<mesh>
		<sphereGeometry args={[4, 32, 32]} />
		<MeshTransmissionMaterial
			samples={16}
			resolution={512}
			thickness={0.8}
			roughness={0.3}
			anisotropy={0}
			distortionScale={0}
			temporalDistortion={0}
		/>
	</mesh>
);
