import {MeshDistortMaterial, MeshTransmissionMaterial, useGLTF, useTexture} from '@react-three/drei';
import {EffectComposer, GodRays} from '@react-three/postprocessing';
import {useState} from 'react';
import {BufferGeometry, Material, Mesh} from 'three';

const Liquid = () => {
	const texture = useTexture('/textures/godray-map.jpg');
	const [material, setMaterial] = useState<Mesh<BufferGeometry, Material | Material[]> | null>(null);

	return (
		<>
			<mesh position={[0, -1.5, 0]} ref={setMaterial}>
				<sphereGeometry args={[2.25, 32, 32]} />
				<MeshDistortMaterial
					map={texture}
					emissiveMap={texture}
					emissive={0x888888}
					distort={0.75}
					speed={5}
					toneMapped={false}
				/>
			</mesh>
			{material && (
				<EffectComposer disableNormalPass multisampling={8}>
					<GodRays
						sun={material}
						exposure={0.2}
						decay={0.8}
						density={0.55}
						weight={5}
						samples={20}
						clampMax={0.95}
						blur
					/>
				</EffectComposer>
			)}
		</>
	);
};

const Flask = () => {
	const {nodes} = useGLTF('/models/labs.glb');

	return (
		<mesh scale={3}>
			<primitive object={nodes.Cone.geometry} />
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
};

export const Potion = () => {
	return (
		<group position={[0, 2, 0]}>
			<Flask />
			<Liquid />
		</group>
	);
};
