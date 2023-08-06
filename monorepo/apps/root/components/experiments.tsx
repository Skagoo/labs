import {useFrame, useThree} from '@react-three/fiber';
import {HorizontalScrollController, useHorizontalScrollController} from './horizontal-scroll-controller';
import {Potion} from './potion/potion';
import {useCallback, useRef} from 'react';
import {Group, Vector3} from 'three';
import {Text, useDetectGPU} from '@react-three/drei';
import {useRouter} from 'next/navigation';

const nPotions = 3;
let potionPositions = [
	new Vector3(-64, 4, -16), // Out of sight
	new Vector3(-32, 4, -16),
	new Vector3(0, 4, 0),
	new Vector3(32, 4, -16),
	new Vector3(64, 4, -16) // Out of sight
];

const labels = ['Fragment shader with mediapipe', 'Skinned Mesh Motion Tracking', 'Sparks VFX on Skinned Mesh'];
const routes = ['/fragment-shader-mediapipe', '/skinned-mesh-motion-tracking', '/sparks-vfx-skinned-mesh'];

let labelPositions = [
	new Vector3(0, 0, 64), // Out of sight
	new Vector3(0, 0, 32),
	new Vector3(0, 0, 6),
	new Vector3(0, 0, 32),
	new Vector3(0, 0, 64) // Out of sight
];

// Allow for nPotions to be smaller than potionPositions.length
if (potionPositions.length > nPotions)
	potionPositions = potionPositions.slice(
		Math.ceil((potionPositions.length - nPotions) / 2),
		-Math.floor((potionPositions.length - nPotions) / 2) < 0
			? -Math.floor((potionPositions.length - nPotions) / 2)
			: undefined
	);

// Allow for nPotions to be smaller than labelPositions.length
if (labelPositions.length > nPotions)
	labelPositions = labelPositions.slice(
		Math.ceil((labelPositions.length - nPotions) / 2),
		-Math.floor((labelPositions.length - nPotions) / 2) < 0
			? -Math.floor((labelPositions.length - nPotions) / 2)
			: undefined
	);

const LabeledPotions = () => {
	const router = useRouter();
	const {offset} = useHorizontalScrollController();

	const {gl} = useThree();
	const GPUTier = useDetectGPU({benchmarksURL: '/gpu-benchmarks', glContext: gl.getContext()});

	// Animate Labels
	const labelsRef = useRef<Group>(null);
	const labelIndex = useRef(0);
	const currentLabelPositionIndex = useRef(0);
	const nextLabelPositionIndex = useRef(0);
	const labelPositionLerpAlpha = useRef(0);

	useFrame(() => {
		if (!labelsRef.current) return;

		labelIndex.current = Math.abs(offset.current) % nPotions;

		for (let i = 0; i < labelsRef.current.children.length; i++) {
			const label = labelsRef.current.children[i];

			currentLabelPositionIndex.current = Math.min(
				Math.floor((i + labelIndex.current) % nPotions),
				labelPositions.length - 1
			);
			nextLabelPositionIndex.current = Math.min(
				Math.floor((i + 1 + labelIndex.current) % nPotions),
				labelPositions.length - 1
			);
			labelPositionLerpAlpha.current = ((i + labelIndex.current) % nPotions) - currentLabelPositionIndex.current;

			// Update position
			label.position
				.copy(labelPositions[currentLabelPositionIndex.current])
				.lerp(labelPositions[nextLabelPositionIndex.current], labelPositionLerpAlpha.current);

			// Update visibility
			label.visible =
				nPotions < 5 ||
				(currentLabelPositionIndex.current > 0 &&
					currentLabelPositionIndex.current < labelPositions.length - 1);
		}
	});

	// Animate Potions
	const potionsRef = useRef<Group>(null);
	const potionIndex = useRef(0);
	const currentPotionPositionIndex = useRef(0);
	const nextPotionPositionIndex = useRef(0);
	const potionPositionLerpAlpha = useRef(0);

	useFrame(() => {
		if (!potionsRef.current) return;

		potionIndex.current = Math.abs(offset.current) % nPotions;

		for (let i = 0; i < potionsRef.current.children.length; i++) {
			const potion = potionsRef.current.children[i];

			currentPotionPositionIndex.current = Math.min(
				Math.floor((i + potionIndex.current) % nPotions),
				potionPositions.length - 1
			);
			nextPotionPositionIndex.current = Math.min(
				Math.floor((i + 1 + potionIndex.current) % nPotions),
				potionPositions.length - 1
			);
			potionPositionLerpAlpha.current =
				((i + potionIndex.current) % nPotions) - currentPotionPositionIndex.current;

			// Update position
			potion.position
				.copy(potionPositions[currentPotionPositionIndex.current])
				.lerp(potionPositions[nextPotionPositionIndex.current], potionPositionLerpAlpha.current);

			// Update visibility
			potion.visible =
				nPotions < 5 ||
				(currentPotionPositionIndex.current > 0 &&
					currentPotionPositionIndex.current < potionPositions.length - 1);
		}
	});

	const onPointerOver = useCallback(() => {
		gl.domElement.style.cursor = 'pointer';
	}, []);

	const onPointerOut = useCallback(() => {
		gl.domElement.style.cursor = 'default';
	}, []);

	return (
		<group position={[0, -1.75, 0]} onPointerMove={onPointerOver} onPointerOut={onPointerOut}>
			<group ref={potionsRef}>
				{Array.from(Array(nPotions)).map((_, i) => (
					<Potion
						key={`potion-${i}`}
						variant={i}
						onClick={() => router.push(routes[Math.floor(i % nPotions)])}
					/>
				))}
			</group>
			<group ref={labelsRef}>
				{Array.from(Array(nPotions)).map((_, i) => (
					<Text
						key={`label-${i}`}
						characters={labels[Math.floor(i % nPotions)]}
						color={0xffffff}
						anchorX='center'
						anchorY='middle'
						scale={GPUTier.isMobile ? 0.5 : 1.0}
						position={[0, -4, 5]}
						onClick={() => routes[Math.floor(i % nPotions)]}
					>
						{labels[Math.floor(i % nPotions)]}
					</Text>
				))}
			</group>
		</group>
	);
};

export const Experiments = () => {
	return (
		<HorizontalScrollController>
			<LabeledPotions />
		</HorizontalScrollController>
	);
};
