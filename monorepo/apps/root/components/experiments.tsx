import {useFrame} from '@react-three/fiber';
import {HorizontalScrollController, useHorizontalScrollController} from './horizontal-scroll-controller';
import {Potion} from './potion/potion';
import {useRef} from 'react';
import {Group, Vector3} from 'three';

const nPotions = 3;
let positions = [
	new Vector3(-64, 4, -16), // Out of sight
	new Vector3(-32, 4, -16),
	new Vector3(0, 4, 0),
	new Vector3(32, 4, -16),
	new Vector3(64, 4, -16) // Out of sight
];

// Allow for nPotions to be smaller than positions.length
if (positions.length > nPotions)
	positions = positions.slice(
		Math.ceil((positions.length - nPotions) / 2),
		-Math.floor((positions.length - nPotions) / 2) < 0 ? -Math.floor((positions.length - nPotions) / 2) : undefined
	);

const Potions = () => {
	const ref = useRef<Group>(null);
	const {offset} = useHorizontalScrollController();

	const potionIndex = useRef(0);
	const currentPositionIndex = useRef(0);
	const nextPositionIndex = useRef(0);
	const positionLerpAlpha = useRef(0);

	useFrame(() => {
		if (!ref.current) return;

		potionIndex.current = Math.abs(offset.current) % nPotions;

		for (let i = 0; i < ref.current.children.length; i++) {
			const potion = ref.current.children[i];

			currentPositionIndex.current = Math.min(
				Math.floor((i + potionIndex.current) % nPotions),
				positions.length - 1
			);
			nextPositionIndex.current = Math.min(
				Math.floor((i + 1 + potionIndex.current) % nPotions),
				positions.length - 1
			);
			positionLerpAlpha.current = ((i + potionIndex.current) % nPotions) - currentPositionIndex.current;

			// Update position
			potion.position
				.copy(positions[currentPositionIndex.current])
				.lerp(positions[nextPositionIndex.current], positionLerpAlpha.current);

			// Update visibility
			potion.visible =
				nPotions < 5 ||
				(currentPositionIndex.current > 0 && currentPositionIndex.current < positions.length - 1);
		}
	});

	return (
		<group ref={ref} position={[0, -1.75, 0]}>
			{Array.from(Array(nPotions)).map((_, i) => (
				<Potion key={`potion-${i}`} variant={i} />
			))}
		</group>
	);
};

export const Experiments = () => {
	return (
		<HorizontalScrollController>
			<Potions />
		</HorizontalScrollController>
	);
};
