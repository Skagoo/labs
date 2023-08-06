import {MeshDistortMaterial, useGLTF, useTexture} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {ReactElement, useRef, useState} from 'react';
import {Color, Mesh, Texture} from 'three';
import {randFloat} from 'three/src/math/MathUtils';

const liquidConfigs = [
	{
		texture: '/textures/liquid/map-0.jpg',
		geometry: <sphereGeometry args={[2.25, 32, 32]} />,
		fillTube: 1
	},
	{
		texture: '/textures/liquid/map-1.jpg',
		geometry: <torusGeometry args={[1.5, 0.5, 32]} />,
		fillTube: 1
	},
	{
		texture: '/textures/liquid/map-2.jpg',
		geometry: <sphereGeometry args={[2, 2, 2]} />,
		fillTube: 1
	}
];

type _LiquidProps = {
	map: Texture;
	geometry: ReactElement;
	fillTube?: number;
};

const _Liquid = ({map, geometry, fillTube = 0}: _LiquidProps) => {
	const ref = useRef<Mesh>(null);
	const [distortMaterial, setDistortMaterial] = useState({});

	const {nodes} = useGLTF('/models/labs.glb') as any;

	useFrame(() => {
		if (!ref.current) return;

		ref.current.rotation.x += 0.005;
		ref.current.rotation.y += 0.005;
	});

	return (
		<>
			<mesh ref={ref} position={[0, -1.75, 0]}>
				{geometry}
				<MeshDistortMaterial
					ref={setDistortMaterial}
					map={map}
					emissiveMap={map}
					emissive={new Color(0x888888).multiplyScalar(randFloat(0.75, 1.5))}
					distort={randFloat(0.35, 0.75)}
					speed={randFloat(3.5, 7.5)}
				/>
			</mesh>
			{fillTube > 0 && (
				<mesh rotation={[0, 0, 0]} position={[0, 2, 0]}>
					<cylinderGeometry args={[1, 1, 4 + 2 * fillTube, 16, 16, true]} />
					<primitive object={distortMaterial} attach={'material'} />
				</mesh>
			)}
		</>
	);
};

type LiquidProps = {
	variant: number;
};

export const Liquid = ({variant}: LiquidProps) => {
	const texture = useTexture(liquidConfigs[variant % liquidConfigs.length].texture);
	const geometry = liquidConfigs[variant % liquidConfigs.length].geometry;
	const fillTube = liquidConfigs[variant % liquidConfigs.length].fillTube;

	return <_Liquid map={texture} geometry={geometry} fillTube={fillTube} />;
};
