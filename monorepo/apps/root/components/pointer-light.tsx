import {Float} from '@react-three/drei';
import {ThreeEvent} from '@react-three/fiber';
import {useRef} from 'react';
import {PointLight} from 'three';

export const PointerLight = () => {
	const light = useRef<PointLight>(null!);

	const anchorLightToPointer = (event: ThreeEvent<PointerEvent>) => {
		light.current?.position.copy(event.point);
	};

	return (
		<>
			<mesh visible={false} onPointerMove={anchorLightToPointer} position={[0, 0, -4]}>
				<planeGeometry args={[64, 64, 1, 1]} />
			</mesh>
			<Float>
				<pointLight ref={light} intensity={4} distance={32} />
			</Float>
		</>
	);
};
