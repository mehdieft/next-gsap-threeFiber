"use client";
import { Scroll, useGLTF, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

// ✅ ModelItem defined BEFORE it's used

export default function ScrollContent() {
  const { viewport } = useThree();

  return (
    <>
      <mesh>
        <torusGeometry />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* ✅ Fixed: Passing model and page correctly */}
      <Scroll>
        <mesh position={[0, -viewport.height, 0]}>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
        <mesh position={[0, -viewport.height * 2, 0]}>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
        <mesh position={[0, -viewport.height * 3, 0]}>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
        <mesh position={[0, -viewport.height * 4, 0]}>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry />
          <meshBasicMaterial />
       
        </mesh>
      </Scroll>
    </>
  );
}
