import {useState} from 'react';
import {BufferGeometry, Material, Mesh} from 'three';
import {EffectComposer, GodRays} from '@react-three/postprocessing';
import {MeshDistortMaterial, useTexture} from '@react-three/drei';

export const GodraysSource = () => {
	const [material, setMaterial] = useState<Mesh<BufferGeometry, Material | Material[]> | null>(null);

	const texture = useTexture('/textures/godray-map.jpg');

	return (
		<>
			<mesh ref={setMaterial} position={[0, 0, -16]}>
				<sphereGeometry args={[2, 32, 32]} />
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
						density={0.75}
						weight={2}
						samples={20}
						clampMax={0.95}
						blur
					/>
				</EffectComposer>
			)}
		</>
	);
};
