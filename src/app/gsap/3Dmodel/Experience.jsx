"use client";

import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";

const ResponsiveIphone = forwardRef(function ResponsiveIphone(_, ref) {
	const groupRef = useRef(null);
	const { size } = useThree();
	const { scene } = useGLTF("/model/apple_iphone_15_pro_max_black.glb");

	useImperativeHandle(ref, () => groupRef.current, []);

	const normalizedScene = useMemo(() => {
		const clone = scene.clone(true);
		const box = new Box3().setFromObject(clone);
		const dimensions = new Vector3();
		box.getSize(dimensions);

		const maxDimension = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;
		const targetSize = 2;
		const normalizeScale = targetSize / maxDimension;

		clone.scale.setScalar(normalizeScale);
		box.setFromObject(clone);
		const center = new Vector3();
		box.getCenter(center);
		clone.position.sub(center);

		return clone;
	}, [scene]);

	useEffect(() => {
		const scale = size.width < 640 ? 0.75 : size.width < 1024 ? 0.95 : 1.45;
		if (groupRef.current) {
			groupRef.current.scale.setScalar(scale);
		}
	}, [size]);

	return (
		<group ref={groupRef}>
			<primitive rotation={[0.4, 1.2, -0.5]} object={normalizedScene} />
		</group>
	);
});

const Experience = forwardRef(function Experience(_, ref) {
	return (
		<>
			<ambientLight intensity={3.7} />
			<directionalLight position={[3, 3, 2]} color="red" intensity={10} />
			<directionalLight position={[-2, 3, 2]} color="blue" intensity={10} />
			<directionalLight position={[1, 0, 0]} color="purple" intensity={3} />


			<ResponsiveIphone ref={ref} />
		</>
	);
});

export default Experience;

useGLTF.preload("/model/apple_iphone_15_pro_max_black.glb");
