import {MeshDistortMaterial, MeshTransmissionMaterial, useGLTF, useTexture} from '@react-three/drei';
import {useState} from 'react';

const Liquid = () => {
	const texture = useTexture('/textures/godray-map.jpg');
	const [distortMaterial, setDistortMaterial] = useState({});

	const {nodes} = useGLTF('/models/labs.glb') as any;

	return (
		<>
			<mesh position={[0, -1.5, 0]}>
				<sphereGeometry args={[2.25, 32, 32]} />
				<MeshDistortMaterial
					ref={setDistortMaterial}
					map={texture}
					emissiveMap={texture}
					emissive={0x888888}
					distort={0.75}
					speed={5}
					toneMapped={false}
				/>
			</mesh>
			<mesh scale={[1.5, 1.5, 1.5]}>
				<primitive object={nodes.Cone.geometry} />
				<primitive object={distortMaterial} attach={'material'} />
			</mesh>
		</>
	);
};

const Flask = () => {
	const {nodes} = useGLTF('/models/labs.glb') as any;

	return (
		<mesh scale={3}>
			<primitive object={nodes.Cone.geometry} />
			<MeshTransmissionMaterial
				samples={16}
				resolution={1024}
				thickness={0.8}
				roughness={0.3}
				anisotropy={1}
				distortionScale={0}
				temporalDistortion={0}
			/>
		</mesh>
	);
};

export const Potion = () => {
	return (
		<group position={[0, 2, 0]}>
			<Flask />
			<Liquid />
		</group>
	);
};
