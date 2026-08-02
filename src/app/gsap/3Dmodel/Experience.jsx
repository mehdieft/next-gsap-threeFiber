"use client";

import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";

function ResponsiveIphone() {
	const groupRef = useRef(null);
	const { size } = useThree();
	const { scene } = useGLTF("/model/apple_iphone_15_pro_max_black.glb");

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
		const scale = size.width < 640 ? 0.75 : size.width < 1024 ? 0.95 : 1.15;
		if (groupRef.current) {
			groupRef.current.scale.setScalar(scale);
		}
	}, [size]);

	return (
		<group  ref={groupRef}>
			<primitive rotation={[0.4, 1.2, -0.5]} object={normalizedScene} />
		</group>
	);
}

export default function Experience() {
	return (
		<>
			<ambientLight intensity={3.7} />
			<directionalLight position={[3, 3, 2]} intensity={1} />
			<ResponsiveIphone />
		</>
	);
}

useGLTF.preload("/model/apple_iphone_15_pro_max_black.glb");
