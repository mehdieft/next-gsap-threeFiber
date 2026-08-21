import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Pepsi = forwardRef(function Pepsi(props, ref) {
  const { nodes, materials } = useGLTF(
    "/model/silencio/josta.glb"
  );

  return (
    <group  {...props} dispose={null}>
      <group ref={ref} scale={0.006} rotation={[0, 0, 0.2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_CanMat_0.geometry}
          material={materials.CanMat}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={35.368}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/model/silencio/josta.glb");