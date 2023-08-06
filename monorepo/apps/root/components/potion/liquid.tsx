import {MeshDistortMaterial, useGLTF, useTexture} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {ReactElement, useRef, useState} from 'react';
import {Color, Mesh, Texture} from 'three';

const liquidConfigs = [
	{
		texture: '/textures/liquid/map-1.jpg',
		geometry: <torusGeometry args={[1.5, 0.5, 32]} />,
		fillTube: 0.01,
		distort: 0.75,
		speed: 5,
		emissionStrength: 1
	},
	{
		texture: '/textures/liquid/map-0.jpg',
		geometry: <sphereGeometry args={[2.25, 32, 32]} />,
		fillTube: 2,
		distort: 0.5,
		speed: 3,
		emissionStrength: 0.5
	},
	{
		texture: '/textures/liquid/map-2.jpg',
		geometry: <sphereGeometry args={[2, 2, 2]} />,
		fillTube: 1,
		distort: 0.2,
		speed: 10,
		emissionStrength: 1
	}
];

type _LiquidProps = {
	map: Texture;
	geometry: ReactElement;
	distort: number;
	speed: number;
	emissionStrength?: number;
	fillTube?: number;
};

const _Liquid = ({map, geometry, distort, speed, emissionStrength = 0.5, fillTube = 0}: _LiquidProps) => {
	const ref = useRef<Mesh>(null);
	const [distortMaterial, setDistortMaterial] = useState({});

	useFrame((_, delta) => {
		if (!ref.current) return;

		ref.current.rotation.x += 0.1 * speed * delta;
		ref.current.rotation.y += 0.1 * speed * delta;
	});

	return (
		<>
			<mesh ref={ref} position={[0, -1.75, 0]}>
				{geometry}
				<MeshDistortMaterial
					ref={setDistortMaterial}
					map={map}
					emissiveMap={map}
					emissive={new Color(0xffffff).multiplyScalar(emissionStrength)}
					distort={distort}
					speed={speed}
				/>
			</mesh>
			{fillTube > 0 && (
				<mesh rotation={[0, 0, 0]} position={[0, 2, 0]}>
					<cylinderGeometry args={[0.85, 0.85, 4 + 2 * fillTube, 16, 16, true]} />
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
	const liquid = liquidConfigs[variant % liquidConfigs.length];

	const texture = useTexture(liquid.texture);

	return (
		<_Liquid
			map={texture}
			geometry={liquid.geometry}
			fillTube={liquid.fillTube}
			distort={liquid.distort}
			speed={liquid.speed}
			emissionStrength={liquid.emissionStrength}
		/>
	);
};
