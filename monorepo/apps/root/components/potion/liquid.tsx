import {MeshDistortMaterial, useGLTF, useTexture} from '@react-three/drei';
import {useState} from 'react';
import {Texture} from 'three';
import {randFloat} from 'three/src/math/MathUtils';

const textureSources = ['/textures/liquid/map-0.jpg', '/textures/liquid/map-1.jpg', '/textures/liquid/map-2.jpg'];

type _LiquidProps = {
	map: Texture;
};

const _Liquid = ({map}: _LiquidProps) => {
	const [distortMaterial, setDistortMaterial] = useState({});

	const {nodes} = useGLTF('/models/labs.glb') as any;

	return (
		<>
			<mesh position={[0, -1.5, 0]}>
				<sphereGeometry args={[2.25, 32, 32]} />
				<MeshDistortMaterial
					ref={setDistortMaterial}
					map={map}
					emissiveMap={map}
					emissive={0x888888}
					distort={randFloat(0.35, 0.75)}
					speed={randFloat(3.5, 7.5)}
				/>
			</mesh>
			<mesh scale={[1.5, 1.5, 1.5]}>
				<primitive object={nodes.Cone.geometry} />
				<primitive object={distortMaterial} attach={'material'} />
			</mesh>
		</>
	);
};

type LiquidProps = {
	variant: number;
};

export const Liquid = ({variant}: LiquidProps) => {
	const texture = useTexture(textureSources[variant % textureSources.length]);

	return <_Liquid map={texture} />;
};
