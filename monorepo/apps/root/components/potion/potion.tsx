import {MeshTransmissionMaterial, useGLTF} from '@react-three/drei';
import {GroupProps} from '@react-three/fiber';
import { Liquid } from './liquid';

const Flask = () => {
	const {nodes} = useGLTF('/models/labs.glb') as any;

	return (
		<mesh scale={3}>
			<primitive object={nodes.Cone.geometry} />
			<MeshTransmissionMaterial
				samples={16}
				resolution={512}
				thickness={0.8}
				roughness={0.3}
				anisotropy={1}
				distortionScale={0}
				temporalDistortion={0}
			/>
		</mesh>
	);
};

type PotionProps = GroupProps & {
	variant?: number;
};

export const Potion = ({children, variant = 1, ...props}: PotionProps) => {
	return (
		<group {...props}>
			<Flask />
			<Liquid variant={variant} />

			{children}
		</group>
	);
};
