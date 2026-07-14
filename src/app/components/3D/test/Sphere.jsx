"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import {
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
  GradientTexture
} from "@react-three/drei";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { color, time, mix, sin } from "three/tsl";

export default function Sphere() {
  const torusRef = useRef();

  useGSAP(() => {
    if (!torusRef.current) return;
    const torus = torusRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
  }, {});

  return (
    <>
      <OrbitControls />
      <directionalLight position={[0, 2, 4]} intensity={1.2} color="red" />
      <ambientLight intensity={0.2} />

      <mesh position={[0, 10.01, -0]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial distort={0.5} speed={2} color="white"  />
      </mesh>
      <mesh>
        <planeGeometry />
        <MeshReflectorMaterial
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={1} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={1} // Amount of distortion based on the distortionMap texture
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
      <mesh position={[1,1,1]}>
  <planeGeometry />
  <meshBasicMaterial>
    <GradientTexture
      stops={[0, 0.8]} // As many stops as you want
      colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
      size={1024} // Size is optional, default = 1024
    />
  </meshBasicMaterial>
</mesh>
    </>
  );
}
