import { useTexture } from "@react-three/drei";
import { useRef } from "react";
export default function Floor() {
  const textures = useTexture({
    map: "/model/textures/painted_concrete_diff_1k.jpg", // Diffuse/Color map
    normalMap: "/model/textures/painted_concrete_nor_gl_1k.jpg", // Normal map
    roughnessMap: "/model/textures/painted_concrete_rough_1k.jpg", // Roughness map
    // Optional: metalnessMap: '/textures/floor_metallic.jpg',
  });
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2 , 0, 0]}
        position={[0, 0.105, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          {...textures}
          roughness={1} // Use roughness map fully
          metalness={0} // Not metallic
          side={2} // Double-sided (if needed)
        />
      </mesh>
    </>
  );
}
