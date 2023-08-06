import {useDetectGPU} from '@react-three/drei';
import {useFrame, useThree} from '@react-three/fiber';
import {AnyHandlerEventTypes, GestureHandlers, useGesture} from '@use-gesture/react';
import {MutableRefObject, PropsWithChildren, createContext, useContext, useMemo, useRef} from 'react';
import {lerp} from 'three/src/math/MathUtils';

type HorizontalScrollControllerProps = PropsWithChildren<{
	domElement?: HTMLElement;
}>;

export type UseHorizontalScrollControllerApi = {
	offset: MutableRefObject<number>;
};

export const HorizontalScrollControllerContext = createContext({} as UseHorizontalScrollControllerApi);

export const HorizontalScrollController = ({domElement, children}: HorizontalScrollControllerProps) => {
	const {gl, size} = useThree();
	const GPUTier = useDetectGPU({benchmarksURL: '/gpu-benchmarks', glContext: gl.getContext()});

	const offset = useRef(0);
	const _offset = useRef(0);

	const useGestureHandlers = useMemo<GestureHandlers<AnyHandlerEventTypes>>(() => {
		const handlers: GestureHandlers<AnyHandlerEventTypes> = {};

		if (GPUTier.isMobile) {
			handlers.onDrag = ({event, offset}) => {
				event.preventDefault();
				_offset.current = offset[1] * 4.0 / size.height;
			};
		} else {
			handlers.onWheel = ({event, offset}) => {
				event.preventDefault();
				_offset.current = offset[1] / size.height;
			};
		}

		return handlers;
	}, [GPUTier]);

	useGesture(useGestureHandlers, {
		target: domElement || gl.domElement,
		drag: {eventOptions: {passive: false}},
		wheel: {eventOptions: {passive: false}}
	});

	useFrame((_, delta) => {
		if (offset.current === undefined || _offset.current === undefined) return;

		offset.current = lerp(offset.current, _offset.current, delta);
	});

	return (
		<HorizontalScrollControllerContext.Provider value={{offset}}>
			{children}
		</HorizontalScrollControllerContext.Provider>
	);
};

export const useHorizontalScrollController = () => useContext(HorizontalScrollControllerContext);
