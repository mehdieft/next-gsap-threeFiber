"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { color, time, mix, sin } from "three/tsl";


export default function Sphere() {
  const torusRef = useRef();

  useGSAP(() => {
    if (!torusRef.current) return;
    const torus = torusRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
  }, {});

  const material = useMemo(() => {
    const mat = new MeshStandardNodeMaterial();

    // example: oscillate between red and blue over time
    mat.colorNode = mix(
      color("red"),
      color("blue"),
      sin(time).mul(0.5).add(0.5)
    );

    return mat;
  }, []);

  return (
    <>
      <OrbitControls />
      <directionalLight position={[0, 2, 4]} intensity={0.2} color="red" />
      <ambientLight intensity={0.2} />
      <mesh rotation-x={-Math.PI * 0.5} ref={torusRef} material={material}>
        <planeGeometry args={[200, 200]} />
      </mesh>
    </>
  );
}